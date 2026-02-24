#include "controllers/task_controller.h"
#include "config/database.h"
#include "utils/logger.h"

namespace TaskController {

// Helper — same standard as auth/section
static crow::response standard_response(int code, bool success,
                                        const std::string &message,
                                        crow::json::wvalue data = {}) {
  crow::json::wvalue res;
  res["success"] = success;
  res["message"] = message;
  if (!data.dump().empty() && data.dump() != "{}") {
    res["data"] = std::move(data);
  }
  return crow::response(code, res);
}

// Helper to safely extract strings
static std::string get_string_safely(const crow::json::rvalue &v) {
  if (v && v.t() == crow::json::type::String) {
    return v.s();
  }
  return "";
}

// GET /api/tasks
crow::response getTasks(const crow::request &req,
                        AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;

    auto rows = Database::getInstance().query(
        "SELECT id, title, description, is_done, due_date, created_at "
        "FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
        {user_id});

    crow::json::wvalue::list tasks;
    for (auto &row : rows) {
      crow::json::wvalue t;
      t["id"] = std::stoi(row["id"]);
      t["title"] = row["title"];
      t["description"] = row["description"] == "NULL" ? "" : row["description"];
      t["is_done"] = row["is_done"] == "1";
      t["due_date"] = row["due_date"] == "NULL" ? "" : row["due_date"];
      t["created_at"] = row["created_at"];
      tasks.push_back(std::move(t));
    }

    crow::json::wvalue data;
    data["tasks"] = std::move(tasks);
    return standard_response(200, true, "Tasks retrieved", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("getTasks ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// POST /api/tasks
crow::response createTask(const crow::request &req,
                          AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;

    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string title =
        body.has("title") ? get_string_safely(body["title"]) : "";
    std::string description =
        body.has("description") ? get_string_safely(body["description"]) : "";
    std::string due_date =
        body.has("due_date") ? get_string_safely(body["due_date"]) : "";

    if (title.empty()) {
      return standard_response(400, false, "Title is required");
    }

    std::string query = "INSERT INTO tasks (user_id, title, description";
    std::string values = "VALUES (?, ?, ?";
    std::vector<std::string> params = {user_id, title, description};

    if (!due_date.empty()) {
      query += ", due_date";
      values += ", ?";
      params.push_back(due_date);
    }

    query += ") " + values + ")";

    bool success = Database::getInstance().execute(query, params);

    if (success) {
      return standard_response(201, true, "Task created successfully");
    } else {
      return standard_response(500, false, "Failed to create task in database");
    }
  } catch (const std::exception &e) {
    Logger::error("createTask ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// PUT /api/tasks/:id
crow::response updateTask(const crow::request &req,
                          AuthMiddleware::context &ctx, int task_id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_task_id = std::to_string(task_id);

    // Verify ownership
    auto check = Database::getInstance().query(
        "SELECT id FROM tasks WHERE id = ? AND user_id = ? LIMIT 1",
        {str_task_id, user_id});

    if (check.empty()) {
      return standard_response(404, false, "Task not found or unauthorized");
    }

    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    // We will build a dynamic update query based on provided fields
    std::string query = "UPDATE tasks SET ";
    std::vector<std::string> params;

    if (body.has("title")) {
      query += "title = ?, ";
      params.push_back(get_string_safely(body["title"]));
    }
    if (body.has("description")) {
      query += "description = ?, ";
      params.push_back(get_string_safely(body["description"]));
    }
    if (body.has("is_done")) {
      query += "is_done = ?, ";
      // Boolean handling from JSON
      bool is_done = false;
      if (body["is_done"].t() == crow::json::type::True)
        is_done = true;
      else if (body["is_done"].t() == crow::json::type::False)
        is_done = false;
      else if (body["is_done"].t() == crow::json::type::String) {
        is_done = (body["is_done"].s() == "true" || body["is_done"].s() == "1");
      }
      params.push_back(is_done ? "1" : "0");
    }
    if (body.has("due_date")) {
      query += "due_date = ?, ";
      std::string d = get_string_safely(body["due_date"]);
      params.push_back(d.empty()
                           ? "NULL"
                           : d); // allows clearing due date conceptually,
                                 // though prepared statements bind as strings.
                                 // In a full ORM, you'd handle NULL distinctly.
    }

    if (params.empty()) {
      return standard_response(400, false, "No fields to update");
    }

    // Remove trailing comma and space
    query.pop_back();
    query.pop_back();

    query += " WHERE id = ? AND user_id = ?";
    params.push_back(str_task_id);
    params.push_back(user_id);

    // Handle the due_date strict NULL hack for prepared strings if needed:
    // By default, our DB class binds everything as string. A literal "NULL"
    // string won't become a SQL NULL easily via bind unless specifically
    // handled. For simplicity, we assume empty string means no due date (or let
    // it fail silently and store the string). Since due_date is DATETIME, MySQL
    // will reject "NULL" string. Better logic:
    std::string final_query = query;
    if (body.has("due_date") && get_string_safely(body["due_date"]).empty()) {
      // Replace the `due_date = ?` placeholder with `due_date = NULL`
      size_t pos = final_query.find("due_date = ?");
      if (pos != std::string::npos) {
        final_query.replace(pos, 12, "due_date = NULL");
        // Remove the "NULL" string from params
        for (auto it = params.begin(); it != params.end(); ++it) {
          if (*it == "NULL") {
            params.erase(it);
            break;
          }
        }
      }
    }

    bool success = Database::getInstance().execute(final_query, params);

    if (success) {
      return standard_response(200, true, "Task updated successfully");
    } else {
      return standard_response(500, false, "Failed to update task");
    }

  } catch (const std::exception &e) {
    Logger::error("updateTask ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// DELETE /api/tasks/:id
crow::response deleteTask(const crow::request &req,
                          AuthMiddleware::context &ctx, int task_id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_task_id = std::to_string(task_id);

    auto check = Database::getInstance().query(
        "SELECT id FROM tasks WHERE id = ? AND user_id = ? LIMIT 1",
        {str_task_id, user_id});

    if (check.empty()) {
      return standard_response(404, false, "Task not found or unauthorized");
    }

    bool success = Database::getInstance().execute(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        {str_task_id, user_id});

    if (success) {
      return standard_response(200, true, "Task deleted successfully");
    } else {
      return standard_response(500, false, "Failed to delete task");
    }
  } catch (const std::exception &e) {
    Logger::error("deleteTask ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace TaskController
