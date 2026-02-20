#ifndef DB_H
#define DB_H

#include <string>
#include <unordered_map>

struct DbConfig {
  std::string db_name;
  std::string db_host;
  std::string db_user;
  std::string db_pass;
  std::string jwt_secret;
};

std::unordered_map<std::string, std::string>
loadEnv(const std::string &filename);
DbConfig getDbConfig(const std::unordered_map<std::string, std::string> &env);

#endif
