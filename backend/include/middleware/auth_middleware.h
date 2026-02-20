#ifndef AUTH_MIDDLEWARE_H
#define AUTH_MIDDLEWARE_H

#include "crow.h"
#include "jwt-cpp/jwt.h"
#include <string>

struct AuthMiddleware : crow::ILocalMiddleware {
  struct context {
    std::string user_id;
  };

  static std::string &secret() {
    static std::string s;
    return s;
  }

  void before_handle(crow::request &req, crow::response &res, context &ctx) {
    auto auth_header = req.get_header_value("Authorization");
    if (auth_header.empty() || auth_header.substr(0, 7) != "Bearer ") {
      res.code = 401;
      res.set_header("Content-Type", "application/json");
      res.body = "{\"success\": false, \"message\": \"No token provided\"}";
      res.end();
      return;
    }

    std::string token = auth_header.substr(7);

    try {
      auto decoded = jwt::decode(token);
      auto verifier = jwt::verify()
                          .allow_algorithm(jwt::algorithm::hs256{secret()})
                          .with_issuer("school_api");

      verifier.verify(decoded);
      ctx.user_id = decoded.get_payload_claim("id").as_string();
    } catch (const std::exception &e) {
      res.code = 401;
      res.set_header("Content-Type", "application/json");
      res.body =
          "{\"success\": false, \"message\": \"Token expired or invalid\"}";
      res.end();
    }
  }

  void after_handle(crow::request &req, crow::response &res, context &ctx) {
    // No-op
  }
};

#endif
