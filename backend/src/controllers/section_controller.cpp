#include "controllers/section_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace SectionController {

// Helper — same as in auth_controller
static crow::response standard_response(
    int code, bool success, const std::string& message,
    crow::json::wvalue data = {}) {
    crow::json::wvalue res;
    res["success"] = success;
    res["message"] = message;
    if (!data.dump().empty() && data.dump() != "{}") {
        res["data"] = std::move(data);
    }
    return crow::response(code, res);
}

// GET /api/sections
crow::response getSections(const crow::request& req) {
    try {
        auto rows = Database::getInstance().query(
            "SELECT id, name, created_at FROM sections ORDER BY name ASC");

        crow::json::wvalue::list sections;
        for (auto& row : rows) {
            crow::json::wvalue section;
            section["id"]         = row["id"];
            section["name"]       = row["name"];
            section["created_at"] = row["created_at"];
            sections.push_back(std::move(section));
        }

        crow::json::wvalue data;
        data["sections"] = std::move(sections);
        return standard_response(200, true, "Sections retrieved", std::move(data));
    } catch (const std::exception& e) {
        Logger::error("getSections ERROR: " + std::string(e.what()));
        return standard_response(500, false, "Internal server error");
    }
}

// GET /api/sections/:id/students
crow::response getSectionStudents(const crow::request& req, int section_id) {
    try {
        // Verify the section exists
        auto sec = Database::getInstance().query(
            "SELECT id, name FROM sections WHERE id = ? LIMIT 1",
            {std::to_string(section_id)});

        if (sec.empty()) {
            return standard_response(404, false, "Section not found");
        }

        auto rows = Database::getInstance().query(
            "SELECT u.id, u.username, u.email "
            "FROM users u "
            "JOIN student_profiles sp ON sp.user_id = u.id "
            "WHERE sp.section_id = ? "
            "ORDER BY u.username ASC",
            {std::to_string(section_id)});

        crow::json::wvalue::list students;
        for (auto& row : rows) {
            crow::json::wvalue student;
            student["id"]       = row["id"];
            student["username"] = row["username"];
            student["email"]    = row["email"];
            students.push_back(std::move(student));
        }

        crow::json::wvalue data;
        data["section"]  = sec[0]["name"];
        data["students"] = std::move(students);
        return standard_response(200, true, "Students retrieved", std::move(data));
    } catch (const std::exception& e) {
        Logger::error("getSectionStudents ERROR: " + std::string(e.what()));
        return standard_response(500, false, "Internal server error");
    }
}

// GET /api/students/me/section
// Reads user_id from AuthMiddleware context
crow::response getMySection(
    const crow::request& req,
    AuthMiddleware::context& ctx) {
    try {
        std::string user_id = ctx.user_id;

        auto rows = Database::getInstance().query(
            "SELECT s.id, s.name "
            "FROM sections s "
            "JOIN student_profiles sp ON sp.section_id = s.id "
            "WHERE sp.user_id = ? LIMIT 1",
            {user_id});

        if (rows.empty()) {
            return standard_response(404, false, "No section assigned to this user");
        }

        crow::json::wvalue data;
        data["section_id"]   = rows[0]["id"];
        data["section_name"] = rows[0]["name"];
        return standard_response(200, true, "Section retrieved", std::move(data));
    } catch (const std::exception& e) {
        Logger::error("getMySection ERROR: " + std::string(e.what()));
        return standard_response(500, false, "Internal server error");
    }
}

} // namespace SectionController
