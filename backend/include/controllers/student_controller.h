#ifndef STUDENT_CONTROLLER_H
#define STUDENT_CONTROLLER_H

#include "crow.h"
#include "middleware/auth_middleware.h"

namespace StudentController {
crow::response getStudents(const crow::request &req,
                           AuthMiddleware::context &ctx);
crow::response getStudentsBySection(const crow::request &req,
                                    AuthMiddleware::context &ctx,
                                    int section_id);
crow::response createStudent(const crow::request &req,
                             AuthMiddleware::context &ctx);
crow::response updateStudent(const crow::request &req,
                             AuthMiddleware::context &ctx, int id);
crow::response deleteStudent(const crow::request &req,
                             AuthMiddleware::context &ctx, int id);
} // namespace StudentController

#endif
