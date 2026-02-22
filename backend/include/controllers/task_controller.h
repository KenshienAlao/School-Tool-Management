#ifndef TASK_CONTROLLER_H
#define TASK_CONTROLLER_H

#include "crow.h"
#include "middleware/auth_middleware.h"

namespace TaskController {

// GET /api/tasks
crow::response getTasks(const crow::request& req, AuthMiddleware::context& ctx);

// POST /api/tasks
crow::response createTask(const crow::request& req, AuthMiddleware::context& ctx);

// PUT /api/tasks/:id
crow::response updateTask(const crow::request& req, AuthMiddleware::context& ctx, int task_id);

// DELETE /api/tasks/:id
crow::response deleteTask(const crow::request& req, AuthMiddleware::context& ctx, int task_id);

} // namespace TaskController

#endif
