#include "controllers/grade_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace GradeController {

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

crow::response getGradesBySection(const crow::request &req,
                                  AuthMiddleware::context &ctx,
                                  int section_id) {
  try {
    auto rows = Database::getInstance().query(
        "SELECT g.grade_id, g.student_id, g.assessment_type, g.grade, "
        "s.last_name, s.first_name "
        "FROM grades g "
        "JOIN students s ON g.student_id = s.student_id "
        "WHERE g.section_id = ? "
        "ORDER BY s.last_name ASC, s.first_name ASC, g.created_at ASC",
        {std::to_string(section_id)});
    crow::json::wvalue::list grades;
    for (auto &row : rows) {
      crow::json::wvalue g;
      g["grade_id"] = std::stoi(row["grade_id"]);
      g["student_id"] = std::stoi(row["student_id"]);
      g["assessment_type"] = row["assessment_type"];
      g["grade"] = std::stod(row["grade"]);
      g["student_name"] = row["last_name"] + ", " + row["first_name"];
      grades.push_back(std::move(g));
    }
    crow::json::wvalue data;
    data["grades"] = std::move(grades);
    return standard_response(200, true, "Grades retrieved", std::move(data));
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response submitGrade(const crow::request &req,
                           AuthMiddleware::context &ctx) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    int user_id = std::stoi(ctx.user_id);
    int student_id = body.has("student_id") ? body["student_id"].i() : 0;
    int course_id = body.has("course_id") ? body["course_id"].i() : 0;
    int section_id = body.has("section_id") ? body["section_id"].i() : 0;
    std::string type = get_string_safely(body["assessment_type"]);
    double grade = body.has("grade") ? body["grade"].d() : 0.0;

    if (student_id == 0 || course_id == 0 || section_id == 0 || type.empty()) {
      return standard_response(400, false, "Missing required fields");
    }

    bool success = Database::getInstance().execute(
        "INSERT INTO grades (user_id, student_id, course_id, section_id, "
        "assessment_type, grade) VALUES (?, ?, ?, ?, ?, ?)",
        {std::to_string(user_id), std::to_string(student_id),
         std::to_string(course_id), std::to_string(section_id), type,
         std::to_string(grade)});

    if (success)
      return standard_response(201, true, "Grade submitted");
    return standard_response(500, false, "Failed to submit grade");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response updateGrade(const crow::request &req,
                           AuthMiddleware::context &ctx, int id) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    if (!body.has("grade"))
      return standard_response(400, false, "Grade value is required");
    double grade = body["grade"].d();

    bool success = Database::getInstance().execute(
        "UPDATE grades SET grade = ? WHERE grade_id = ?",
        {std::to_string(grade), std::to_string(id)});

    if (success)
      return standard_response(200, true, "Grade updated");
    return standard_response(500, false, "Failed to update grade");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteGrade(const crow::request &req,
                           AuthMiddleware::context &ctx, int id) {
  try {
    bool success = Database::getInstance().execute(
        "DELETE FROM grades WHERE grade_id = ?", {std::to_string(id)});
    if (success)
      return standard_response(200, true, "Grade deleted");
    return standard_response(500, false, "Failed to delete grade");
  } catch (const std::exception &e) {
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace GradeController
