#ifndef ROUTES_H
#define ROUTES_H

#include "crow.h"
#include "utils/cors.h"
#include <string>

void setup_routes(crow::App<CORSMiddleware> &app, const std::string &jwt_secret);

#endif
