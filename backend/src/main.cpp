#include "config/db.h"
#include "config/database.h"
#include "crow.h"
#include "routes/routes.h"
#include "utils/cors.h"
#include <iostream>

int main() {
  // load env
  auto env = loadEnv(".env");
  DbConfig dbConfig = getDbConfig(env);

  // database
  if (!Database::getInstance().connect(dbConfig)) {
      std::cerr << "database error" << std::endl;
  }

  std::cout << "server on http://localhost:8080" << std::endl;
  
  // cors
  crow::App<CORSMiddleware> app;

  // routes
  setup_routes(app, dbConfig.jwt_secret);

  // server
  app.port(8080).multithreaded().run();

  return 0;
}
