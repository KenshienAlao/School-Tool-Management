#include "controllers/student_controller.h"
#include "config/database.h"
#include "utils/response_utils.h"

namespace StudentController {

using namespace ResponseUtils;

/**
 * Maps a database row to a JSON student object.
 * Handles NULL values and type conversions.
 */
static crow::json::wvalue
mapRowToStudent(const std::unordered_map<std::string, std::string> &row) {
  crow::json::wvalue s;
  s["student_id"] = std::stoi(row.at("student_id"));
  s["last_name"] = row.at("last_name");
  s["first_name"] = row.at("first_name");
  s["middle_name"] =
      (row.at("middle_name") == "NULL" ? "" : row.at("middle_name"));
  s["suffix"] = (row.at("suffix") == "NULL" ? "" : row.at("suffix"));

  if (row.find("section_id") != row.end()) {
    s["section_id"] = std::stoi(row.at("section_id"));
  }

  s["course"] = (row.at("course") == "NULL" ? "" : row.at("course"));
  s["status"] = (row.at("status") == "NULL" ? "Regular" : row.at("status"));
  s["contact_number"] =
      (row.at("contact_number") == "NULL" ? "" : row.at("contact_number"));
  s["birthday"] = (row.at("birthday") == "NULL" ? "" : row.at("birthday"));
  s["student_id_school"] =
      (row.at("student_id_school") == "NULL" ? ""
                                             : row.at("student_id_school"));
  return s;
}

crow::response getStudents(const crow::request &req,
                           AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;
    auto rows = Database::getInstance().query(
        "SELECT student_id, last_name, first_name, middle_name, suffix, "
        "section_id, course, status, contact_number, birthday, "
        "student_id_school FROM students WHERE user_id = ? "
        "ORDER BY last_name ASC, first_name ASC",
        {user_id});

    crow::json::wvalue::list students;
    for (auto &row : rows) {
      students.push_back(mapRowToStudent(row));
    }

    crow::json::wvalue data;
    data["students"] = std::move(students);
    return standard_response(200, true, "Students retrieved", std::move(data));
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response getStudentsBySection(const crow::request &req,
                                    AuthMiddleware::context &ctx,
                                    int section_id) {
  try {
    std::string user_id = ctx.user_id;
    auto rows = Database::getInstance().query(
        "SELECT student_id, last_name, first_name, middle_name, suffix, "
        "course, status, contact_number, birthday, student_id_school "
        "FROM students WHERE section_id = ? AND user_id = ? "
        "ORDER BY last_name ASC, first_name ASC",
        {std::to_string(section_id), user_id});

    crow::json::wvalue::list students;
    for (auto &row : rows) {
      students.push_back(mapRowToStudent(row));
    }

    crow::json::wvalue data;
    data["students"] = std::move(students);
    return standard_response(200, true, "Students retrieved", std::move(data));
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response createStudent(const crow::request &req,
                             AuthMiddleware::context &ctx) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    // Basic validation
    if (!body.has("last_name") || !body.has("first_name") ||
        !body.has("section_id")) {
      return standard_response(400, false, "Missing required fields");
    }

    std::string user_id = ctx.user_id;
    std::string last_name = body["last_name"].s();
    std::string first_name = body["first_name"].s();
    int section_id = body["section_id"].i();
    std::string student_id_school =
        get_string_safely(body["student_id_school"]);

    // Duplicate check: Name + Section
    auto existing_name = Database::getInstance().query(
        "SELECT student_id FROM students WHERE last_name = ? AND first_name = "
        "? "
        "AND section_id = ? AND user_id = ?",
        {last_name, first_name, std::to_string(section_id), user_id});

    if (!existing_name.empty()) {
      return standard_response(409, false,
                               "Student already exists in this section");
    }

    // Duplicate check: School ID
    if (!student_id_school.empty()) {
      auto existing_id =
          Database::getInstance().query("SELECT student_id FROM students WHERE "
                                        "student_id_school = ? AND user_id = ?",
                                        {student_id_school, user_id});

      if (!existing_id.empty()) {
        return standard_response(
            409, false, "School ID already assigned to another student");
      }
    }

    bool success = Database::getInstance().execute(
        "INSERT INTO students (last_name, first_name, middle_name, suffix, "
        "section_id, user_id, course, status, contact_number, birthday, "
        "student_id_school) VALUES (?, ?, NULLIF(?, ''), NULLIF(?, ''), ?, ?, "
        "NULLIF(?, ''), NULLIF(?, ''), NULLIF(?, ''), NULLIF(?, ''), NULLIF(?, "
        "''))",
        {last_name, first_name, get_string_safely(body["middle_name"]),
         get_string_safely(body["suffix"]), std::to_string(section_id), user_id,
         get_string_safely(body["course"]), get_string_safely(body["status"]),
         get_string_safely(body["contact_number"]),
         get_string_safely(body["birthday"]), student_id_school});

    if (success)
      return standard_response(201, true, "Student created");
    return standard_response(500, false, "Failed to create student");

  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response updateStudent(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_id = std::to_string(id);

    // Verify ownership first
    auto check =
        Database::getInstance().query("SELECT student_id FROM students WHERE "
                                      "student_id = ? AND user_id = ? LIMIT 1",
                                      {str_id, user_id});

    if (check.empty()) {
      return standard_response(404, false, "Student not found or unauthorized");
    }

    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    // Dynamic query building for updates
    std::string query = "UPDATE students SET ";
    std::vector<std::string> params;

    const std::vector<std::string> string_fields = {
        "last_name",      "first_name", "middle_name",
        "suffix",         "course",     "status",
        "contact_number", "birthday",   "student_id_school"};

    for (const auto &field : string_fields) {
      if (body.has(field)) {
        bool is_optional = (field != "last_name" && field != "first_name");
        query += field + (is_optional ? " = NULLIF(?, ''), " : " = ?, ");
        params.push_back(get_string_safely(body[field]));
      }
    }

    if (body.has("section_id")) {
      query += "section_id = ?, ";
      params.push_back(std::to_string(body["section_id"].i()));
    }

    if (params.empty())
      return standard_response(400, false, "No fields to update");

    query.pop_back();
    query.pop_back(); // Remove trailing comma and space
    query += " WHERE student_id = ? AND user_id = ?";
    params.push_back(str_id);
    params.push_back(user_id);

    if (Database::getInstance().execute(query, params)) {
      return standard_response(200, true, "Student updated");
    }
    return standard_response(500, false, "Failed to update student");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteStudent(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  try {
    std::string user_id = ctx.user_id;
    bool success = Database::getInstance().execute(
        "DELETE FROM students WHERE student_id = ? AND user_id = ?",
        {std::to_string(id), user_id});

    if (success)
      return standard_response(200, true, "Student deleted");
    return standard_response(500, false, "Failed to delete student");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace StudentController
