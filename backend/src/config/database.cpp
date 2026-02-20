#include "config/database.h"
#include "utils/logger.h"
#include <vector>
#include <unordered_map>
#include <string>
#include <cstring>
#include <iostream>

Database& Database::getInstance() {
    static Database instance;
    return instance;
}

bool Database::connect(const DbConfig& config) {
    conn = mysql_init(nullptr);
    if (conn == nullptr) {
        Logger::error("mysql_init() failed");
        return false;
    }

    if (mysql_real_connect(conn, config.db_host.c_str(), config.db_user.c_str(),
                           config.db_pass.c_str(), config.db_name.c_str(), 
                           0, nullptr, 0) == nullptr) {
        Logger::error("mysql_real_connect() failed: " + std::string(mysql_error(conn)));
        mysql_close(conn);
        conn = nullptr;
        return false;
    }

    Logger::info("Connected to MySQL database: " + config.db_name);
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
bool Database::execute(const std::string& query, const std::vector<std::string>& params) {
    if (!conn) return false;

    MYSQL_STMT* stmt = mysql_stmt_init(conn);
    if (!stmt) return false;

    if (mysql_stmt_prepare(stmt, query.c_str(), query.length())) {
        mysql_stmt_close(stmt);
        return false;
    }

    std::vector<MYSQL_BIND> binds(params.size());
    for (size_t i = 0; i < params.size(); ++i) {
        memset(&binds[i], 0, sizeof(MYSQL_BIND));
        binds[i].buffer_type = MYSQL_TYPE_STRING;
        binds[i].buffer = (void*)params[i].c_str();
        binds[i].buffer_length = params[i].length();
        binds[i].is_null = 0;
    }

    if (params.size() > 0 && mysql_stmt_bind_param(stmt, binds.data())) {
        mysql_stmt_close(stmt);
        return false;
    }

    if (mysql_stmt_execute(stmt)) {
        mysql_stmt_close(stmt);
        return false;
    }

    mysql_stmt_close(stmt);
    return true;
}

std::vector<std::unordered_map<std::string, std::string>> Database::query(const std::string& query, const std::vector<std::string>& params) {
    std::vector<std::unordered_map<std::string, std::string>> results;
    if (!conn) return results;

    MYSQL_STMT* stmt = mysql_stmt_init(conn);
    if (!stmt) return results;

    if (mysql_stmt_prepare(stmt, query.c_str(), query.length())) {
        mysql_stmt_close(stmt);
        return results;
    }

    std::vector<MYSQL_BIND> binds(params.size());
    for (size_t i = 0; i < params.size(); ++i) {
        memset(&binds[i], 0, sizeof(MYSQL_BIND));
        binds[i].buffer_type = MYSQL_TYPE_STRING;
        binds[i].buffer = (void*)params[i].c_str();
        binds[i].buffer_length = params[i].length();
        binds[i].is_null = 0;
    }

    if (params.size() > 0 && mysql_stmt_bind_param(stmt, binds.data())) {
        mysql_stmt_close(stmt);
        return results;
    }

    if (mysql_stmt_execute(stmt)) {
        mysql_stmt_close(stmt);
        return results;
    }

    MYSQL_RES* prepare_meta_result = mysql_stmt_result_metadata(stmt);
    if (!prepare_meta_result) {
        mysql_stmt_close(stmt);
        return results;
    }

    int column_count = mysql_num_fields(prepare_meta_result);
    MYSQL_FIELD* fields = mysql_fetch_fields(prepare_meta_result);

    std::vector<MYSQL_BIND> result_binds(column_count);
    std::vector<std::vector<char>> buffers(column_count, std::vector<char>(1024));
    std::vector<unsigned long> lengths(column_count);
    std::vector<char> is_null(column_count);

    for (int i = 0; i < column_count; ++i) {
        memset(&result_binds[i], 0, sizeof(MYSQL_BIND));
        result_binds[i].buffer_type = MYSQL_TYPE_STRING;
        result_binds[i].buffer = buffers[i].data();
        result_binds[i].buffer_length = buffers[i].size();
        result_binds[i].length = &lengths[i];
        result_binds[i].is_null = (bool *)&is_null[i];
    }

    if (mysql_stmt_bind_result(stmt, result_binds.data())) {
        mysql_free_result(prepare_meta_result);
        mysql_stmt_close(stmt);
        return results;
    }

    while (mysql_stmt_fetch(stmt) == 0) {
        std::unordered_map<std::string, std::string> row_map;
        for (int i = 0; i < column_count; ++i) {
            if (is_null[i]) {
                row_map[fields[i].name] = "NULL";
            } else {
                row_map[fields[i].name] = std::string(buffers[i].data(), lengths[i]);
            }
        }
        results.push_back(row_map);
    }

    mysql_free_result(prepare_meta_result);
    mysql_stmt_close(stmt);
    return results;
}
