#ifndef CORS_H
#define CORS_H

#include "crow.h"

struct CORSMiddleware {
  struct context {};
  void before_handle(crow::request& /*req*/, crow::response& /*res*/, context& /*ctx*/) {}
  void after_handle(crow::request& /*req*/, crow::response& res, context& /*ctx*/) {
    res.add_header("Access-Control-Allow-Origin", "*");
    res.add_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.add_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Handle preflight requests
    if (res.code == 404 && res.body.empty()) {
        // This is a bit of a hack for OPTIONS if no route is defined
    }
  }
};

#endif
