#ifndef AUTH_CONTROLLER_H
#define AUTH_CONTROLLER_H

#include "crow.h"

namespace AuthController {
crow::response login(const crow::request &req, const std::string &secret);
crow::response registerUser(const crow::request &req);
} // namespace AuthController

#endif
