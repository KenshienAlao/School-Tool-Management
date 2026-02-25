#include "controllers/section_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace SectionController {

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

crow::response getSections(const crow::request &req,
                           AuthMiddleware::context &ctx) {
  try {
    auto rows = Database::getInstance().query(
        "SELECT s.section_id, s.section_name, s.course_id, s.grading_config, "
        "c.course_name "
        "FROM sections s "
        "JOIN courses c ON s.course_id = c.course_id "
        "ORDER BY c.course_name ASC, s.section_name ASC");
    crow::json::wvalue::list sections;
    for (auto &row : rows) {
      crow::json::wvalue section;
      section["section_id"] = std::stoi(row["section_id"]);
      section["section_name"] = row["section_name"];
      section["course_id"] = std::stoi(row["course_id"]);
      section["course_name"] = row["course_name"];
      auto config = crow::json::load(row["grading_config"]);
      if (config) {
        section["grading_config"] = config;
      } else {
        section["grading_config"] = crow::json::wvalue::list();
      }
      sections.push_back(std::move(section));
    }
    crow::json::wvalue data;
    data["sections"] = std::move(sections);
    return standard_response(200, true, "Sections retrieved", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("getSections error: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

crow::response createSection(const crow::request &req,
                             AuthMiddleware::context &ctx) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string name = get_string_safely(body["section_name"]);
    int course_id = body.has("course_id") ? body["course_id"].i() : 0;
    std::string config = body.has("grading_config")
                             ? crow::json::wvalue(body["grading_config"]).dump()
                             : "[]";

    if (name.empty() || course_id == 0)
      return standard_response(400, false,
                               "Section name and course_id are required");

    bool success = Database::getInstance().execute(
        "INSERT INTO sections (course_id, section_name, grading_config) VALUES "
        "(?, ?, ?)",
        {std::to_string(course_id), name, config});
    if (success)
      return standard_response(201, true, "Section created");
    return standard_response(500, false, "Failed to create section");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response updateSection(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  // Similar to create but with WHERE section_id = id
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string query = "UPDATE sections SET ";
    std::vector<std::string> params;

    if (body.has("section_name")) {
      query += "section_name = ?, ";
      params.push_back(get_string_safely(body["section_name"]));
    }
    if (body.has("course_id")) {
      query += "course_id = ?, ";
      params.push_back(std::to_string(body["course_id"].i()));
    }
    if (body.has("grading_config")) {
      query += "grading_config = ?, ";
      params.push_back(crow::json::wvalue(body["grading_config"]).dump());
    }

    if (params.empty())
      return standard_response(400, false, "No fields to update");
    query.pop_back();
    query.pop_back(); // remove last comma
    query += " WHERE section_id = ?";
    params.push_back(std::to_string(id));

    bool success = Database::getInstance().execute(query, params);
    if (success)
      return standard_response(200, true, "Section updated");
    return standard_response(500, false, "Failed to update section");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteSection(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  try {
    bool success = Database::getInstance().execute(
        "DELETE FROM sections WHERE section_id = ?", {std::to_string(id)});
    if (success)
      return standard_response(200, true, "Section deleted");
    return standard_response(500, false, "Failed to delete section");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

// Dummy implementations for compatibility if headers expect them
crow::response getSectionStudents(const crow::request &req, int section_id) {
  return standard_response(501, false, "Not implemented here");
}
crow::response getMySection(const crow::request &req,
                            AuthMiddleware::context &ctx) {
  return standard_response(501, false, "Not implemented here");
}

} // namespace SectionController
