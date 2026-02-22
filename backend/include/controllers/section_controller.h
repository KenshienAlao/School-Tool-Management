#ifndef SECTION_CONTROLLER_H
#define SECTION_CONTROLLER_H

#include "crow.h"
#include "utils/cors.h"
#include "middleware/auth_middleware.h"

namespace SectionController {

// GET /api/sections — list all sections
crow::response getSections(const crow::request& req);

// GET /api/sections/:id/students — all students in a section
crow::response getSectionStudents(const crow::request& req, int section_id);

// GET /api/students/me/section — logged-in user's section
crow::response getMySection(
    const crow::request& req,
    AuthMiddleware::context& ctx);

} // namespace SectionController

#endif

