#ifndef LOGGER_H
#define LOGGER_H

#include <iostream>
#include <string>
#include <chrono>
#include <iomanip>
#include <sstream>

namespace Logger {

enum class Level {
    INFO,
    WARN,
    ERROR
};

inline std::string levelToString(Level level) {
    switch (level) {
        case Level::INFO:  return "INFO";
        case Level::WARN:  return "WARN";
        case Level::ERROR: return "ERROR";
        default:           return "UNKNOWN";
    }
}

inline std::string getCurrentTimestamp() {
    auto now = std::chrono::system_clock::now();
    auto in_time_t = std::chrono::system_clock::to_time_t(now);
    std::stringstream ss;
    ss << std::put_time(std::localtime(&in_time_t), "%Y-%m-%d %H:%M:%S");
    return ss.str();
}

inline void log(Level level, const std::string& message) {
    std::string timestamp = getCurrentTimestamp();
    std::string levelStr = levelToString(level);
    
    std::ostream& out = (level == Level::ERROR) ? std::cerr : std::cout;
    out << "[" << timestamp << "] [" << levelStr << "] " << message << std::endl;
}

inline void info(const std::string& message) { log(Level::INFO, message); }
inline void warn(const std::string& message) { log(Level::WARN, message); }
inline void error(const std::string& message) { log(Level::ERROR, message); }

} // namespace Logger

#endif
