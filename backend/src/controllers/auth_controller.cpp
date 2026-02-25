#include "controllers/auth_controller.h"
#include "config/database.h"
#include "jwt-cpp/jwt.h"
#include "utils/logger.h"
#include "utils/security.h"
#include <chrono>

namespace AuthController {

auto get_string_safely = [](const crow::json::rvalue &v) -> std::string {
  if (v && v.t() == crow::json::type::String) {
    return v.s();
  }
  return "";
};

auto standard_response = [](int code, bool success, const std::string &message,
                            crow::json::wvalue data = {}) {
  crow::json::wvalue res;
  res["success"] = success;
  res["message"] = message;
  if (!data.dump().empty() && data.dump() != "{}") {
    res["data"] = std::move(data);
  }
  return crow::response(code, res);
};

// login
crow::response login(const crow::request &req, const std::string &secret) {
  try {
    auto x = crow::json::load(req.body);
    if (!x)
      return standard_response(400, false, "Invalid JSON");

    std::string email = x.has("email") ? get_string_safely(x["email"]) : "";
    std::string password =
        x.has("password") ? get_string_safely(x["password"]) : "";

    if (email.empty() || password.empty()) {
      return standard_response(400, false, "All fields are required");
    }

    Logger::info("Login attempt for email: " + email);

    // query using prepared statement
    auto users =
        Database::getInstance().query("SELECT user_id, user_name, password "
                                      "FROM users WHERE email = ? LIMIT 1",
                                      {email});

    if (users.empty()) {
      Logger::warn("Login failed: User not found (" + email + ")");
      return standard_response(401, false, "Invalid credentials");
    }

    // hash pass compare
    if (!Security::verifyPassword(password, users[0]["password"])) {
      Logger::warn("Login failed: Invalid password (" + email + ")");
      return standard_response(401, false, "Invalid credentials");
    }

    // generate token
    std::string user_id = users[0]["user_id"];
    auto token =
        jwt::create()
            .set_type("JWS")
            .set_issuer("school_api")
            //  user logged in ID
            .set_payload_claim("id", jwt::claim(user_id))
            // user logged in username
            .set_payload_claim("username", jwt::claim(users[0]["user_name"]))
            .set_payload_claim("user_name", jwt::claim(users[0]["user_name"]))
            // user logged in email
            .set_payload_claim("email", jwt::claim(email))
            //  token expire time
            .set_expires_at(std::chrono::system_clock::now() +
                            std::chrono::hours{1})
            .sign(jwt::algorithm::hs256{secret});
    Logger::info("user added: " + email);

    // frontend get this message
    crow::json::wvalue data;
    data["user_id"] = user_id;
    data["id"] = user_id;
    data["email"] = email;
    data["username"] = users[0]["user_name"];
    data["user_name"] = users[0]["user_name"];
    data["token"] = token;

    return standard_response(200, true, "Success", std::move(data));
  } catch (const std::exception &e) {
    Logger::error("LOGIN ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Internal server error");
  }
}

// register
crow::response registerUser(const crow::request &req) {
  try {
    auto x = crow::json::load(req.body);
    if (!x)
      return standard_response(400, false, "Invalid JSON");

    std::string user_name = "";
    if (x.has("user_name")) {
      user_name = get_string_safely(x["user_name"]);
    } else if (x.has("username")) {
      user_name = get_string_safely(x["username"]);
    }
    std::string email = x.has("email") ? get_string_safely(x["email"]) : "";
    std::string password =
        x.has("password") ? get_string_safely(x["password"]) : "";

    if (user_name.empty() || email.empty() || password.empty()) {
      return standard_response(400, false, "All fields are required");
    }

    Logger::info("Registration attempt for email: " + email);

    // check if email already exists
    auto emailExist = Database::getInstance().query(
        "SELECT user_id FROM users WHERE email = ? LIMIT 1", {email});
    if (!emailExist.empty()) {
      return standard_response(400, false, "Email already registered");
    }

    // hash pass and insert
    std::string hashedPassword = Security::hashPassword(password);
    bool success = Database::getInstance().execute(
        "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)",
        {user_name, email, hashedPassword});

    if (success) {
      Logger::info("User registered successfully: " + email);
      return standard_response(201, true, "User registered successfully");
    } else {
      throw std::runtime_error("Database insertion failed");
    }
  } catch (const std::exception &e) {
    Logger::error("REGISTRATION ERROR: " + std::string(e.what()));
    return standard_response(500, false, "Registration failed: Internal Error");
  }
}
} // namespace AuthController
