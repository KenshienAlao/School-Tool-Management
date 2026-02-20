#include "config/database.h"
#include "config/db.h"
#include "crow.h"
#include "middleware/auth_middleware.h"
#include "routes/routes.h"
#include "utils/cors.h"
#include "utils/logger.h"

int main() {
  // load env
  auto env = loadEnv(".env");
  DbConfig dbConfig = getDbConfig(env);

  // database
  if (!Database::getInstance().connect(dbConfig)) {
    Logger::error("Failed to connect to database");
  }

  Logger::info("Server starting on http://localhost:8080");

  // middleware
  AuthMiddleware::secret() = dbConfig.jwt_secret;

  // app with middleware
  crow::App<CORSMiddleware, AuthMiddleware> app;

  // routes
  setup_routes(app, dbConfig.jwt_secret);

  // server
  app.port(8080).multithreaded().run();

  return 0;
}
