#include "controllers/section_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace SectionController {

// Helper — same as in auth_controller
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

// helper to get string safely
static std::string get_string_safely(const crow::json::rvalue &v) {
  if (v && v.t() == crow::json::type::String) {
    return v.s();
  }
  return "";
}

// GET /api/sections — list all sections for the logged-in user
crow::response getSections(const crow::request &req,
                           AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;
    auto rows = Database::getInstance().query(
        "SELECT id, course_name, name, schedule, created_at FROM sections "
        "WHERE user_id = ? ORDER BY course_name ASC, name ASC",
        {user_id});

    crow::json::wvalue::list sections;
    for (auto &row : rows) {
      crow::json::wvalue section;
      section["id"] = row["id"]; // Keep ID as string since that's what we do in
                                 // React, or let React handle it
      section["courseName"] = row["course_name"];
      section["sectionName"] = row["name"];
      // Parse JSON schedule
      auto sched = crow::json::load(row["schedule"]);
      if (sched) {
        section["schedule"] = sched;
      } else {
        // Default empty schedule
        crow::json::wvalue defaultSched;
        defaultSched["M"] = crow::json::wvalue::list();
        defaultSched["T"] = crow::json::wvalue::list();
        defaultSched["W"] = crow::json::wvalue::list();
        defaultSched["TH"] = crow::json::wvalue::list();
        defaultSched["F"] = crow::json::wvalue::list();
        defaultSched["ST"] = crow::json::wvalue::list();
        defaultSched["SN"] = crow::json::wvalue::list();
        section["schedule"] = std::move(defaultSched);
      }
      section["created_at"] = row["created_at"];
      sections.push_back(std::move(section));
    }

    crow::json::wvalue data;
    data["sections"] = std::move(sections);
    return standard_response(200, true, "Sections retrieved", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("getSections ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// POST /api/sections
crow::response createSection(const crow::request &req,
                             AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(500, false, "Invalid JSON");

    std::string course_name =
        body.has("courseName") ? get_string_safely(body["courseName"]) : "";
    std::string section_name =
        body.has("sectionName") ? get_string_safely(body["sectionName"]) : "";

    if (course_name.empty() || section_name.empty()) {
      return standard_response(401, false,
                               "Course Name and Section Name are required");
    }

    std::string schedule_json =
        body.has("schedule") ? crow::json::wvalue(body["schedule"]).dump()
                             : "{}";

    bool success = Database::getInstance().execute(
        "INSERT INTO sections (user_id, course_name, name, schedule) VALUES "
        "(?, ?, ?, ?)",
        {user_id, course_name, section_name, schedule_json});

    if (success) {
      return standard_response(201, true, "Section created successfully");
    } else {
      return standard_response(401, false,
                               "Failed to create section in database");
    }
  } catch (const std::exception &e) {
    Logger::error("createSection ERROR: " + std::string(e.what()));
    return standard_response(401, false, "Internal server error");
  }
}

// PUT /api/sections/:id
crow::response updateSection(const crow::request &req,
                             AuthMiddleware::context &ctx, int section_id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_section_id = std::to_string(section_id);

    auto check = Database::getInstance().query(
        "SELECT id FROM sections WHERE id = ? AND user_id = ? LIMIT 1",
        {str_section_id, user_id});

    if (check.empty()) {
      return standard_response(404, false, "Section not found or unauthorized");
    }

    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string query = "UPDATE sections SET ";
    std::vector<std::string> params;

    if (body.has("courseName")) {
      query += "course_name = ?, ";
      params.push_back(get_string_safely(body["courseName"]));
    }
    if (body.has("sectionName")) {
      query += "name = ?, ";
      params.push_back(get_string_safely(body["sectionName"]));
    }
    if (body.has("schedule")) {
      query += "schedule = ?, ";
      params.push_back(crow::json::wvalue(body["schedule"]).dump());
    }

    if (params.empty()) {
      return standard_response(400, false, "No fields to update");
    }

    query.pop_back();
    query.pop_back();

    query += " WHERE id = ? AND user_id = ?";
    params.push_back(str_section_id);
    params.push_back(user_id);

    bool success = Database::getInstance().execute(query, params);

    if (success) {
      return standard_response(200, true, "Section updated successfully");
    } else {
      return standard_response(500, false, "Failed to update section");
    }

  } catch (const std::exception &e) {
    Logger::error("updateSection ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// DELETE /api/sections/:id
crow::response deleteSection(const crow::request &req,
                             AuthMiddleware::context &ctx, int section_id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_section_id = std::to_string(section_id);

    auto check = Database::getInstance().query(
        "SELECT id FROM sections WHERE id = ? AND user_id = ? LIMIT 1",
        {str_section_id, user_id});

    if (check.empty()) {
      return standard_response(404, false, "Section not found or unauthorized");
    }

    bool success = Database::getInstance().execute(
        "DELETE FROM sections WHERE id = ? AND user_id = ?",
        {str_section_id, user_id});

    if (success) {
      return standard_response(200, true, "Section deleted successfully");
    } else {
      return standard_response(500, false, "Failed to delete section");
    }
  } catch (const std::exception &e) {
    Logger::error("deleteSection ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// GET /api/sections/:id/students
crow::response getSectionStudents(const crow::request &req, int section_id) {
  try {
    // Verify the section exists
    auto sec = Database::getInstance().query(
        "SELECT id, name FROM sections WHERE id = ? LIMIT 1",
        {std::to_string(section_id)});

    if (sec.empty()) {
      return standard_response(404, false, "Section not found");
    }

    auto rows = Database::getInstance().query(
        "SELECT u.id, u.username, u.email "
        "FROM users u "
        "JOIN student_profiles sp ON sp.user_id = u.id "
        "WHERE sp.section_id = ? "
        "ORDER BY u.username ASC",
        {std::to_string(section_id)});

    crow::json::wvalue::list students;
    for (auto &row : rows) {
      crow::json::wvalue student;
      student["id"] = row["id"];
      student["username"] = row["username"];
      student["email"] = row["email"];
      students.push_back(std::move(student));
    }

    crow::json::wvalue data;
    data["section"] = sec[0]["name"];
    data["students"] = std::move(students);
    return standard_response(200, true, "Students retrieved", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("getSectionStudents ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// GET /api/students/me/section
// Reads user_id from AuthMiddleware context
crow::response getMySection(const crow::request &req,
                            AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;

    auto rows = Database::getInstance().query(
        "SELECT s.id, s.name "
        "FROM sections s "
        "JOIN student_profiles sp ON sp.section_id = s.id "
        "WHERE sp.user_id = ? LIMIT 1",
        {user_id});

    if (rows.empty()) {
      return standard_response(404, false, "No section assigned to this user");
    }

    crow::json::wvalue data;
    data["section_id"] = rows[0]["id"];
    data["section_name"] = rows[0]["name"];
    return standard_response(200, true, "Section retrieved", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("getMySection ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace SectionController
