#include "config/db.h"
#include <fstream>
#include <iostream>

std::unordered_map<std::string, std::string>
loadEnv(const std::string &filename) {
  std::unordered_map<std::string, std::string> env;
  std::ifstream file(filename);
  if (!file.is_open()) {
    file.open("../" + filename);
  }

  if (file.is_open()) {
    std::string line;
    while (std::getline(file, line)) {
      size_t delimiterPos = line.find('=');
      if (delimiterPos != std::string::npos) {
        std::string key = line.substr(0, delimiterPos);
        std::string value = line.substr(delimiterPos + 1);
        env[key] = value;
      }
    }
  }
  return env;
}


DbConfig getDbConfig(const std::unordered_map<std::string, std::string> &env) {
  DbConfig config;
  config.db_name = env.count("DB_NAME") ? env.at("DB_NAME") : "not found database";
  config.db_host = env.count("DB_HOST") ? env.at("DB_HOST") : "not found host";
  config.db_user = env.count("DB_USER") ? env.at("DB_USER") : "not found root";
  config.db_pass = env.count("DB_PASS") ? env.at("DB_PASS") : "not found password";
  config.jwt_secret =
      env.count("JWT_SECRET") ? env.at("JWT_SECRET") : "default_secret";
  return config;
}
