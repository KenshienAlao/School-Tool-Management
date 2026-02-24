#ifndef SECTION_CONTROLLER_H
#define SECTION_CONTROLLER_H

#include "crow.h"
#include "utils/cors.h"
#include "middleware/auth_middleware.h"

namespace SectionController {

// GET /api/sections — list all sections for the logged-in user
crow::response getSections(const crow::request& req, AuthMiddleware::context& ctx);

// POST /api/sections — create a new section
crow::response createSection(const crow::request& req, AuthMiddleware::context& ctx);

// PUT /api/sections/:id — update a section
crow::response updateSection(const crow::request& req, AuthMiddleware::context& ctx, int section_id);

// DELETE /api/sections/:id — delete a section
crow::response deleteSection(const crow::request& req, AuthMiddleware::context& ctx, int section_id);

// GET /api/sections/:id/students — all students in a section
crow::response getSectionStudents(const crow::request& req, int section_id);

// GET /api/students/me/section — logged-in user's section
crow::response getMySection(
    const crow::request& req,
    AuthMiddleware::context& ctx);

} // namespace SectionController

#endif

