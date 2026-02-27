#pragma once
#include "crow.h"
#include <string>

namespace ResponseUtils {

inline crow::response standard_response(int code, bool success,
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

inline std::string get_string_safely(const crow::json::rvalue &v) {
  if (v && v.t() == crow::json::type::String)
    return v.s();
  return "";
}

} // namespace ResponseUtils
