#include "controllers/section_controller.h"
#include "config/database.h"
#include "utils/logger.h"
#include "utils/response_utils.h"

namespace SectionController {

using namespace ResponseUtils;

crow::response getSections(const crow::request &req,
                           AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;
    auto rows = Database::getInstance().query(
        "SELECT s.section_id, s.section_name, s.course_id, s.grading_config, "
        "c.course_name FROM sections s "
        "JOIN courses c ON s.course_id = c.course_id "
        "WHERE s.user_id = ? "
        "ORDER BY c.course_name ASC, s.section_name ASC",
        {user_id});

    crow::json::wvalue::list sections;
    for (auto &row : rows) {
      crow::json::wvalue section;
      section["section_id"] = std::stoi(row.at("section_id"));
      section["section_name"] = row.at("section_name");
      section["course_id"] = std::stoi(row.at("course_id"));
      section["course_name"] = row.at("course_name");

      auto config = crow::json::load(row.at("grading_config"));
      if (config) {
        section["grading_config"] = std::move(config);
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

    if (name.empty() || course_id == 0) {
      return standard_response(400, false,
                               "Section name and course_id are required");
    }

    bool success = Database::getInstance().execute(
        "INSERT INTO sections (course_id, user_id, section_name, "
        "grading_config) "
        "VALUES (?, ?, ?, ?)",
        {std::to_string(course_id), ctx.user_id, name, config});

    if (success)
      return standard_response(201, true, "Section created");
    return standard_response(500, false, "Failed to create section");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response updateSection(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_id = std::to_string(id);

    // Verify ownership
    auto check =
        Database::getInstance().query("SELECT section_id FROM sections WHERE "
                                      "section_id = ? AND user_id = ? LIMIT 1",
                                      {str_id, user_id});

    if (check.empty()) {
      return standard_response(404, false, "Section not found or unauthorized");
    }

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
    query.pop_back(); // Remove trailing comma and space
    query += " WHERE section_id = ? AND user_id = ?";
    params.push_back(str_id);
    params.push_back(user_id);

    if (Database::getInstance().execute(query, params)) {
      return standard_response(200, true, "Section updated");
    }
    return standard_response(500, false, "Failed to update section");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteSection(const crow::request &req,
                             AuthMiddleware::context &ctx, int id) {
  try {
    bool success = Database::getInstance().execute(
        "DELETE FROM sections WHERE section_id = ? AND user_id = ?",
        {std::to_string(id), ctx.user_id});

    if (success)
      return standard_response(200, true, "Section deleted");
    return standard_response(500, false, "Failed to delete section");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

// Dummy implementations for compatibility
crow::response getSectionStudents(const crow::request &req, int section_id) {
  return standard_response(501, false, "Not implemented");
}
crow::response getMySection(const crow::request &req,
                            AuthMiddleware::context &ctx) {
  return standard_response(501, false, "Not implemented");
}

} // namespace SectionController
