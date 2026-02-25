#ifndef GRADE_CONTROLLER_H
#define GRADE_CONTROLLER_H

#include "crow.h"
#include "middleware/auth_middleware.h"

namespace GradeController {
crow::response getGradesBySection(const crow::request &req,
                                  AuthMiddleware::context &ctx, int section_id);
crow::response submitGrade(const crow::request &req,
                           AuthMiddleware::context &ctx);
crow::response updateGrade(const crow::request &req,
                           AuthMiddleware::context &ctx, int id);
crow::response deleteGrade(const crow::request &req,
                           AuthMiddleware::context &ctx, int id);
} // namespace GradeController

#endif
