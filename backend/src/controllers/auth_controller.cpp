#include "controllers/auth_controller.h"
#include "config/database.h"
#include "utils/security.h"
#include "jwt-cpp/jwt.h"
#include <chrono>

namespace AuthController {
crow::response login(const crow::request &req, const std::string &secret) {
  try {
    auto x = crow::json::load(req.body);
    if (!x) {
      return crow::response(400, "Invalid JSON");
    }

    std::string email = x.has("email") ? std::string(x["email"].s()) : "";
    std::string password = x.has("password") ? std::string(x["password"].s()) : "";

    if (email.empty() || password.empty()) {
      crow::json::wvalue res;
      res["success"] = false;
      res["message"] = "All fields are required";
      return crow::response(400, res);
    }

    // 3. Database query (Actual)
    std::string query = "SELECT * FROM users WHERE email = '" + email + "' LIMIT 1";
    auto users = Database::getInstance().query(query);

    if (users.empty()) {
      crow::json::wvalue res;
      res["success"] = false;
      res["message"] = "User not found";
      return crow::response(400, res);
    }

    // 4. Password comparison (Actual)
    if (!Security::verifyPassword(password, users[0]["password"])) {
      crow::json::wvalue res;
      res["success"] = false;
      res["message"] = "Invalid password";
      return crow::response(400, res);
    }

    // 5. Generate Token
    std::string user_id = users[0]["id"];
    auto token = jwt::create()
                     .set_type("JWS")
                     .set_issuer("school_api")
                     .set_payload_claim("id", jwt::claim(user_id))
                     .set_expires_at(std::chrono::system_clock::now() +
                                     std::chrono::hours{1})
                     .sign(jwt::algorithm::hs256{secret});

    // 6. Return success
    crow::json::wvalue res;
    res["success"] = true;
    res["message"] = "User logged in successfully";
    res["token"] = token;
    res["data"]["id"] = user_id;
    res["data"]["email"] = email;
    res["data"]["username"] = users[0]["username"];
    
    return crow::response(200, res);
  } catch (const std::exception &e) {
    crow::json::wvalue res;
    res["success"] = false;
    res["message"] = "Internal server error";
    return crow::response(500, res);
  }
}

crow::response registerUser(const crow::request &req) {
  try {
    auto x = crow::json::load(req.body);
    if (!x) return crow::response(400, "Invalid JSON");

    std::string username = x.has("username") ? std::string(x["username"].s()) : "";
    std::string email = x.has("email") ? std::string(x["email"].s()) : "";
    std::string password = x.has("password") ? std::string(x["password"].s()) : "";

    if (username.empty() || email.empty() || password.empty()) {
      crow::json::wvalue res;
      res["success"] = false;
      res["message"] = "All fields are required";
      return crow::response(400, res);
    }

    // Check if user already exists
    std::string checkQuery = "SELECT id FROM users WHERE email = '" + email + "' LIMIT 1";
    auto existing = Database::getInstance().query(checkQuery);
    if (!existing.empty()) {
      crow::json::wvalue res;
      res["success"] = false;
      res["message"] = "Email already registered";
      return crow::response(400, res);
    }

    // Insert new user with hashed password
    std::string hashedPassword = Security::hashPassword(password);
    std::string insertQuery = "INSERT INTO users (username, email, password) VALUES ('" + 
                              username + "', '" + email + "', '" + hashedPassword + "')";
    
    if (Database::getInstance().execute(insertQuery)) {
      crow::json::wvalue res;
      res["success"] = true;
      res["message"] = "User registered successfully";
      return crow::response(201, res);
    } else {
      throw std::runtime_error("Database insertion failed");
    }
  } catch (const std::exception &e) {
    crow::json::wvalue res;
    res["success"] = false;
    res["message"] = "Registration failed: Internal Error";
    return crow::response(500, res);
  }
}
} // namespace AuthController
