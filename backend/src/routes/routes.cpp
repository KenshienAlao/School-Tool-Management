#include "routes/routes.h"
#include "controllers/attendance_controller.h"
#include "controllers/auth_controller.h"
#include "controllers/grade_controller.h"
#include "controllers/section_controller.h"
#include "controllers/task_controller.h"

void setup_routes(crow::App<CORSMiddleware, AuthMiddleware> &app,
                  const std::string &jwt_secret) {
  // Basic route
  CROW_ROUTE(app, "/")
  ([]() {
    crow::json::wvalue res;
    res["message"] = "Backend is running successfully";
    res["status"] = "success";
    return res;
  });

  // auth routes (public)
  CROW_ROUTE(app, "/api/auth/login")
      .methods(crow::HTTPMethod::POST)([jwt_secret](const crow::request &req) {
        return AuthController::login(req, jwt_secret);
      });

  CROW_ROUTE(app, "/api/auth/register")
      .methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        return AuthController::registerUser(req);
      });

  // section routes (PROTECTED)
  // GET /api/sections  — list all sections
  CROW_ROUTE(app, "/api/sections")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [](const crow::request &req) {
            return SectionController::getSections(req);
          });

  // GET /api/sections/<id>/students  — students in a specific section
  CROW_ROUTE(app, "/api/sections/<int>/students")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [](const crow::request &req, int section_id) {
            return SectionController::getSectionStudents(req, section_id);
          });

  // GET /api/students/me/section  — logged-in user's own section
  CROW_ROUTE(app, "/api/students/me/section")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req) {
            auto& ctx = app.get_context<AuthMiddleware>(req);
            return SectionController::getMySection(req, ctx);
          });

  // task routes (PROTECTED)
  
  CROW_ROUTE(app, "/api/tasks")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req) {
            auto& ctx = app.get_context<AuthMiddleware>(req);
            return TaskController::getTasks(req, ctx);
          });

  CROW_ROUTE(app, "/api/tasks")
      .methods(crow::HTTPMethod::POST)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req) {
            auto& ctx = app.get_context<AuthMiddleware>(req);
            return TaskController::createTask(req, ctx);
          });

  CROW_ROUTE(app, "/api/tasks/<int>")
      .methods(crow::HTTPMethod::PUT)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto& ctx = app.get_context<AuthMiddleware>(req);
            return TaskController::updateTask(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/tasks/<int>")
      .methods(crow::HTTPMethod::DELETE)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto& ctx = app.get_context<AuthMiddleware>(req);
            return TaskController::deleteTask(req, ctx, id);
          });

//   // attendance route (PROTECTED)
//   CROW_ROUTE(app, "/api/attendance").CROW_MIDDLEWARES(app, AuthMiddleware)([]() {
//     return AttendanceController::getAttendance();
//   });

//   // grade route (PROTECTED)
//   CROW_ROUTE(app, "/api/grades").CROW_MIDDLEWARES(app, AuthMiddleware)([]() {
//     return GradeController::getGrades();
//   });
}
