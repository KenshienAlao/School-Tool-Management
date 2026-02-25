#ifndef COURSE_CONTROLLER_H
#define COURSE_CONTROLLER_H

#include "crow.h"
#include "middleware/auth_middleware.h"

namespace CourseController {
crow::response getCourses(const crow::request &req,
                          AuthMiddleware::context &ctx);
crow::response createCourse(const crow::request &req,
                            AuthMiddleware::context &ctx);
crow::response updateCourse(const crow::request &req,
                            AuthMiddleware::context &ctx, int id);
crow::response deleteCourse(const crow::request &req,
                            AuthMiddleware::context &ctx, int id);
} // namespace CourseController

#endif
