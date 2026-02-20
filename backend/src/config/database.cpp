#include "config/database.h"
#include <iostream>

Database& Database::getInstance() {
    static Database instance;
    return instance;
}

bool Database::connect(const DbConfig& config) {
    conn = mysql_init(nullptr);
    if (conn == nullptr) {
        std::cerr << "mysql_init() failed" << std::endl;
        return false;
    }

    if (mysql_real_connect(conn, config.db_host.c_str(), config.db_user.c_str(),
                           config.db_pass.c_str(), config.db_name.c_str(), 
                           0, nullptr, 0) == nullptr) {
        std::cerr << "mysql_real_connect() failed: " << mysql_error(conn) << std::endl;
        mysql_close(conn);
        conn = nullptr;
        return false;
    }

    std::cout << "Connected to MySQL database: " << config.db_name << std::endl;
    return true;
}

void Database::disconnect() {
    if (conn) {
        mysql_close(conn);
        conn = nullptr;
    }
}

bool Database::execute(const std::string& query) {
    if (mysql_query(conn, query.c_str())) {
        std::cerr << "INSERT/UPDATE/DELETE failed: " << mysql_error(conn) << std::endl;
        return false;
    }
    return true;
}

std::vector<std::unordered_map<std::string, std::string>> Database::query(const std::string& query) {
    std::vector<std::unordered_map<std::string, std::string>> results;

    if (mysql_query(conn, query.c_str())) {
        std::cerr << "SELECT failed: " << mysql_error(conn) << std::endl;
        return results;
    }

    MYSQL_RES* res = mysql_store_result(conn);
    if (res == nullptr) {
        return results;
    }

    MYSQL_FIELD* fields = mysql_fetch_fields(res);
    int num_fields = mysql_num_fields(res);

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(res))) {
        std::unordered_map<std::string, std::string> row_map;
        for (int i = 0; i < num_fields; i++) {
            row_map[fields[i].name] = row[i] ? row[i] : "NULL";
        }
        results.push_back(row_map);
    }

    mysql_free_result(res);
    return results;
}
