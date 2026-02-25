#include "controllers/course_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace CourseController {

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

crow::response getCourses(const crow::request &req,
                          AuthMiddleware::context &ctx) {
  try {
    auto rows = Database::getInstance().query(
        "SELECT course_id, course_name FROM courses ORDER BY course_name ASC");
    crow::json::wvalue::list courses;
    for (auto &row : rows) {
      crow::json::wvalue course;
      course["course_id"] = std::stoi(row["course_id"]);
      course["course_name"] = row["course_name"];
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
        "INSERT INTO courses (course_name) VALUES (?)", {name});
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

    bool success = Database::getInstance().execute(
        "UPDATE courses SET course_name = ? WHERE course_id = ?",
        {name, std::to_string(id)});
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
        "DELETE FROM courses WHERE course_id = ?", {std::to_string(id)});
    if (success)
      return standard_response(200, true, "Course deleted");
    return standard_response(500, false, "Failed to delete course");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace CourseController
