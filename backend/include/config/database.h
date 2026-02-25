#ifndef DATABASE_H
#define DATABASE_H

#include "config/db.h"
#include <mutex>
#include <mysql/mysql.h>
#include <string>
#include <unordered_map>
#include <vector>

class Database {
public:
  static Database &getInstance();
  bool connect(const DbConfig &config);
  void disconnect();

  // Executes a query that doesn't return results (INSERT, UPDATE, DELETE)
  bool execute(const std::string &query);
  bool execute(const std::string &query,
               const std::vector<std::string> &params);
  // Executes a query that returns results (SELECT)
  std::vector<std::unordered_map<std::string, std::string>>
  query(const std::string &query);
  std::vector<std::unordered_map<std::string, std::string>>
  query(const std::string &query, const std::vector<std::string> &params);

private:
  Database() : conn(nullptr) {}
  ~Database() { disconnect(); }
  Database(const Database &) = delete;
  Database &operator=(const Database &) = delete;

  MYSQL *conn;
  std::mutex db_mutex;
};

#endif
