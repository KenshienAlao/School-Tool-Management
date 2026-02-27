#include "controllers/auth_controller.h"
#include "controllers/course_controller.h"
#include "controllers/grade_controller.h"
#include "controllers/section_controller.h"
#include "controllers/student_controller.h"
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

  // Course routes
  CROW_ROUTE(app, "/api/courses")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return CourseController::getCourses(req, ctx);
      });

  CROW_ROUTE(app, "/api/courses")
      .methods(crow::HTTPMethod::POST)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return CourseController::createCourse(req, ctx);
      });

  CROW_ROUTE(app, "/api/courses/<int>")
      .methods(crow::HTTPMethod::PUT)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return CourseController::updateCourse(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/courses/<int>")
      .methods(crow::HTTPMethod::DELETE)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return CourseController::deleteCourse(req, ctx, id);
          });

  // Section routes
  CROW_ROUTE(app, "/api/sections")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return SectionController::getSections(req, ctx);
      });

  CROW_ROUTE(app, "/api/sections")
      .methods(crow::HTTPMethod::POST)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return SectionController::createSection(req, ctx);
      });

  CROW_ROUTE(app, "/api/sections/<int>")
      .methods(crow::HTTPMethod::PUT)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return SectionController::updateSection(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/sections/<int>")
      .methods(crow::HTTPMethod::DELETE)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return SectionController::deleteSection(req, ctx, id);
          });

  // Student routes
  CROW_ROUTE(app, "/api/students")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return StudentController::getStudents(req, ctx);
      });

  CROW_ROUTE(app, "/api/students")
      .methods(crow::HTTPMethod::POST)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return StudentController::createStudent(req, ctx);
      });

  CROW_ROUTE(app, "/api/students/<int>")
      .methods(crow::HTTPMethod::PUT)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return StudentController::updateStudent(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/students/<int>")
      .methods(crow::HTTPMethod::DELETE)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return StudentController::deleteStudent(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/sections/<int>/students")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return StudentController::getStudentsBySection(req, ctx, id);
          });

  // Grade routes
  CROW_ROUTE(app, "/api/grades/section/<int>")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return GradeController::getGradesBySection(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/grades")
      .methods(crow::HTTPMethod::POST)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return GradeController::submitGrade(req, ctx);
      });

  CROW_ROUTE(app, "/api/grades/<int>")
      .methods(crow::HTTPMethod::PUT)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return GradeController::updateGrade(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/grades/<int>")
      .methods(crow::HTTPMethod::DELETE)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return GradeController::deleteGrade(req, ctx, id);
          });

  // tasks (PROTECTED)
  CROW_ROUTE(app, "/api/tasks")
      .methods(crow::HTTPMethod::GET)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return TaskController::getTasks(req, ctx);
      });

  CROW_ROUTE(app, "/api/tasks")
      .methods(crow::HTTPMethod::POST)
      .CROW_MIDDLEWARES(app, AuthMiddleware)([&app](const crow::request &req) {
        auto &ctx = app.get_context<AuthMiddleware>(req);
        return TaskController::createTask(req, ctx);
      });

  CROW_ROUTE(app, "/api/tasks/<int>")
      .methods(crow::HTTPMethod::PUT)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return TaskController::updateTask(req, ctx, id);
          });

  CROW_ROUTE(app, "/api/tasks/<int>")
      .methods(crow::HTTPMethod::DELETE)
      .CROW_MIDDLEWARES(app, AuthMiddleware)(
          [&app](const crow::request &req, int id) {
            auto &ctx = app.get_context<AuthMiddleware>(req);
            return TaskController::deleteTask(req, ctx, id);
          });
}
