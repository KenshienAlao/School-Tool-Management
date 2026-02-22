#ifndef CORS_H
#define CORS_H

#include "crow.h"

struct CORSMiddleware {
  struct context {};
  void before_handle(crow::request& /*req*/, crow::response& /*res*/, context& /*ctx*/) {}
  void after_handle(crow::request& req, crow::response& res, context& /*ctx*/) {
    res.add_header("Access-Control-Allow-Origin", "*");
    res.add_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.add_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Handle preflight requests
    if (req.method == crow::HTTPMethod::OPTIONS) {
        res.code = 204;
        res.body = "";
    }
  }
};

#endif
