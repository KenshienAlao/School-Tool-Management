#include "controllers/course_controller.h"
#include "config/database.h"
#include "utils/logger.h"
#include "utils/response_utils.h"

namespace CourseController {

using namespace ResponseUtils;

crow::response getCourses(const crow::request &req,
                          AuthMiddleware::context &ctx) {
  try {
    auto rows = Database::getInstance().query(
        "SELECT course_id, course_name FROM courses WHERE user_id = ? "
        "ORDER BY course_name ASC",
        {ctx.user_id});

    crow::json::wvalue::list courses;
    for (auto &row : rows) {
      crow::json::wvalue course;
      course["course_id"] = std::stoi(row.at("course_id"));
      course["course_name"] = row.at("course_name");
      courses.push_back(std::move(course));
    }

    crow::json::wvalue data;
    data["courses"] = std::move(courses);
    return standard_response(200, true, "Courses retrieved", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("getCourses error: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

crow::response createCourse(const crow::request &req,
                            AuthMiddleware::context &ctx) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string name = get_string_safely(body["course_name"]);
    if (name.empty())
      return standard_response(400, false, "Course name is required");

    bool success = Database::getInstance().execute(
        "INSERT INTO courses (course_name, user_id) VALUES (?, ?)",
        {name, ctx.user_id});

    if (success)
      return standard_response(201, true, "Course created");
    return standard_response(500, false, "Failed to create course");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response updateCourse(const crow::request &req,
                            AuthMiddleware::context &ctx, int id) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string name = get_string_safely(body["course_name"]);
    if (name.empty())
      return standard_response(400, false, "Course name is required");

    std::string str_id = std::to_string(id);

    // Verify ownership
    auto check =
        Database::getInstance().query("SELECT course_id FROM courses WHERE "
                                      "course_id = ? AND user_id = ? LIMIT 1",
                                      {str_id, ctx.user_id});

    if (check.empty()) {
      return standard_response(404, false, "Course not found or unauthorized");
    }

    bool success =
        Database::getInstance().execute("UPDATE courses SET course_name = ? "
                                        "WHERE course_id = ? AND user_id = ?",
                                        {name, str_id, ctx.user_id});

    if (success)
      return standard_response(200, true, "Course updated");
    return standard_response(500, false, "Failed to update course");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteCourse(const crow::request &req,
                            AuthMiddleware::context &ctx, int id) {
  try {
    bool success = Database::getInstance().execute(
        "DELETE FROM courses WHERE course_id = ? AND user_id = ?",
        {std::to_string(id), ctx.user_id});

    if (success)
      return standard_response(200, true, "Course deleted");
    return standard_response(500, false, "Failed to delete course");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace CourseController
