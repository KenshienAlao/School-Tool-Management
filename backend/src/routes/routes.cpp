#include "routes/routes.h"
#include "controllers/attendance_controller.h"
#include "controllers/auth_controller.h"
#include "controllers/grade_controller.h"

void setup_routes(crow::App<CORSMiddleware> &app, const std::string &jwt_secret) {
  // Basic route
  CROW_ROUTE(app, "/")
  ([]() {
    crow::json::wvalue res;
    res["message"] = "Backend is running successfully";
    res["status"] = "success";
    return res;
  });

  // auth route
  CROW_ROUTE(app, "/api/auth/login")
      .methods(crow::HTTPMethod::POST)([&jwt_secret](const crow::request &req) {
        return AuthController::login(req, jwt_secret);
      });

  CROW_ROUTE(app, "/api/auth/register")
      .methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        return AuthController::registerUser(req);
      });

  // attendace route
  CROW_ROUTE(app, "/api/attendance")
  ([]() { return AttendanceController::getAttendance(); });

  // grade route
  CROW_ROUTE(app, "/api/grades")
  ([]() { return GradeController::getGrades(); });
}
