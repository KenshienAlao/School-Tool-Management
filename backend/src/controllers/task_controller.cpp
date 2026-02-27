#include "controllers/task_controller.h"
#include "config/database.h"
#include "utils/logger.h"
#include "utils/response_utils.h"

namespace TaskController {

using namespace ResponseUtils;

crow::response getTasks(const crow::request &req,
                        AuthMiddleware::context &ctx) {
  try {
    std::string user_id = ctx.user_id;
    auto rows = Database::getInstance().query(
        "SELECT task_id, title, description, is_done, due_date, created_at "
        "FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
        {user_id});

    crow::json::wvalue::list tasks;
    for (auto &row : rows) {
      crow::json::wvalue t;
      t["id"] = std::stoi(row.at("task_id"));
      t["title"] = row.at("title");
      t["description"] =
          (row.at("description") == "NULL" ? "" : row.at("description"));
      t["is_done"] = (row.at("is_done") == "1");
      t["due_date"] = (row.at("due_date") == "NULL" ? "" : row.at("due_date"));
      t["created_at"] = row.at("created_at");
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

crow::response createTask(const crow::request &req,
                          AuthMiddleware::context &ctx) {
  try {
    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

    std::string title = get_string_safely(body["title"]);
    if (title.empty())
      return standard_response(400, false, "Title is required");

    std::string description = get_string_safely(body["description"]);
    std::string due_date = get_string_safely(body["due_date"]);

    std::string query = "INSERT INTO tasks (user_id, title, description";
    std::string values = "VALUES (?, ?, ?";
    std::vector<std::string> params = {ctx.user_id, title, description};

    if (!due_date.empty()) {
      query += ", due_date";
      values += ", ?";
      params.push_back(due_date);
    }

    query += ") " + values + ")";

    if (Database::getInstance().execute(query, params)) {
      auto last_id =
          Database::getInstance().query("SELECT LAST_INSERT_ID() as id");
      crow::json::wvalue data;
      if (!last_id.empty())
        data["id"] = std::stoi(last_id[0]["id"]);
      return standard_response(201, true, "Task created successfully",
                               std::move(data));
    }
    return standard_response(500, false, "Failed to create task");
  } catch (const std::exception &e) {
    Logger::error("createTask ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

crow::response updateTask(const crow::request &req,
                          AuthMiddleware::context &ctx, int task_id) {
  try {
    std::string user_id = ctx.user_id;
    std::string str_task_id = std::to_string(task_id);

    auto check = Database::getInstance().query(
        "SELECT task_id FROM tasks WHERE task_id = ? AND user_id = ? LIMIT 1",
        {str_task_id, user_id});

    if (check.empty())
      return standard_response(404, false, "Task not found");

    auto body = crow::json::load(req.body);
    if (!body)
      return standard_response(400, false, "Invalid JSON");

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
      bool is_done = false;
      if (body["is_done"].t() == crow::json::type::True)
        is_done = true;
      else if (body["is_done"].t() == crow::json::type::String) {
        is_done = (body["is_done"].s() == "true" || body["is_done"].s() == "1");
      }
      params.push_back(is_done ? "1" : "0");
    }
    if (body.has("due_date")) {
      query += "due_date = ?, ";
      params.push_back(get_string_safely(body["due_date"]));
    }

    if (params.empty())
      return standard_response(400, false, "No fields to update");

    query.pop_back();
    query.pop_back();

    // Handle NULL for empty due_date
    if (body.has("due_date") && get_string_safely(body["due_date"]).empty()) {
      size_t pos = query.find("due_date = ?");
      if (pos != std::string::npos) {
        query.replace(pos, 12, "due_date = NULL");
        // Remove the empty entry from params
        for (auto it = params.begin(); it != params.end(); ++it) {
          if (it->empty()) {
            params.erase(it);
            break;
          }
        }
      }
    }

    query += " WHERE task_id = ? AND user_id = ?";
    params.push_back(str_task_id);
    params.push_back(user_id);

    if (Database::getInstance().execute(query, params)) {
      return standard_response(200, true, "Task updated");
    }
    return standard_response(500, false, "Failed to update task");
  } catch (const std::exception &e) {
    Logger::error("updateTask ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

crow::response deleteTask(const crow::request &req,
                          AuthMiddleware::context &ctx, int task_id) {
  try {
    bool success = Database::getInstance().execute(
        "DELETE FROM tasks WHERE task_id = ? AND user_id = ?",
        {std::to_string(task_id), ctx.user_id});

    if (success)
      return standard_response(200, true, "Task deleted");
    return standard_response(500, false, "Failed to delete task");
  } catch (const std::exception &e) {
    Logger::error("deleteTask ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

} // namespace TaskController
