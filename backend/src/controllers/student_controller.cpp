#include "controllers/student_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace StudentController {

static crow::response standard_response(int code, bool success,
                                        const std::string &message,
                                        crow::json::wvalue data = {}) {
  crow::json::wvalue res;
  res["success"] = success;
  res["message"] = message;
  if (!data.dump().empty() && data.dump() != "{}") {
    res["data"] = std::move(data);
  }
  return crow::response(code, res);
}

static std::string get_string_safely(const crow::json::rvalue &v) {
  if (v && v.t() == crow::json::type::String)
    return v.s();
  return "";
}

crow::response getStudents(const crow::request &req,
                           AuthMiddleware::context &ctx) {
  try {
    auto rows = Database::getInstance().query(
        "SELECT student_id, last_name, first_name, middle_name, suffix, "
        "section_id FROM students ORDER BY last_name ASC, first_name ASC");
    crow::json::wvalue::list students;
    for (auto &row : rows) {
      crow::json::wvalue s;
      s["student_id"] = std::stoi(row["student_id"]);
      s["last_name"] = row["last_name"];
      s["first_name"] = row["first_name"];
      s["middle_name"] = row["middle_name"];
      s["suffix"] = row["suffix"];
      s["section_id"] = std::stoi(row["section_id"]);
      students.push_back(std::move(s));
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
    auto rows = Database::getInstance().query(
        "SELECT student_id, last_name, first_name, middle_name, suffix FROM "
        "students WHERE section_id = ? ORDER BY last_name ASC, first_name ASC",
        {std::to_string(section_id)});
    crow::json::wvalue::list students;
    for (auto &row : rows) {
      crow::json::wvalue s;
      s["student_id"] = std::stoi(row["student_id"]);
      s["last_name"] = row["last_name"];
      s["first_name"] = row["first_name"];
      s["middle_name"] = row["middle_name"];
      s["suffix"] = row["suffix"];
      students.push_back(std::move(s));
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

    std::string last = get_string_safely(body["last_name"]);
    std::string first = get_string_safely(body["first_name"]);
    std::string middle = get_string_safely(body["middle_name"]);
    std::string suffix = get_string_safely(body["suffix"]);
    int section_id = body.has("section_id") ? body["section_id"].i() : 0;

    if (last.empty() || first.empty() || section_id == 0)
      return standard_response(400, false, "Missing required fields");

    bool success = Database::getInstance().execute(
        "INSERT INTO students (last_name, first_name, middle_name, suffix, "
        "section_id) VALUES (?, ?, ?, ?, ?)",
        {last, first, middle, suffix, std::to_string(section_id)});
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
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string query = "UPDATE students SET ";
    std::vector<std::string> params;

    if (body.has("last_name")) {
      query += "last_name = ?, ";
      params.push_back(get_string_safely(body["last_name"]));
    }
    if (body.has("first_name")) {
      query += "first_name = ?, ";
      params.push_back(get_string_safely(body["first_name"]));
    }
    if (body.has("middle_name")) {
      query += "middle_name = ?, ";
      params.push_back(get_string_safely(body["middle_name"]));
    }
    if (body.has("suffix")) {
      query += "suffix = ?, ";
      params.push_back(get_string_safely(body["suffix"]));
    }
    if (body.has("section_id")) {
      query += "section_id = ?, ";
      params.push_back(std::to_string(body["section_id"].i()));
    }

    if (params.empty())
      return standard_response(400, false, "No fields to update");
    query.pop_back();
    query.pop_back();
    query += " WHERE student_id = ?";
    params.push_back(std::to_string(id));

    bool success = Database::getInstance().execute(query, params);
    if (success)
      return standard_response(200, true, "Student updated");
    return standard_response(500, false, "Failed to update student");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteStudent(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  try {
    bool success = Database::getInstance().execute(
        "DELETE FROM students WHERE student_id = ?", {std::to_string(id)});
    if (success)
      return standard_response(200, true, "Student deleted");
    return standard_response(500, false, "Failed to delete student");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace StudentController
