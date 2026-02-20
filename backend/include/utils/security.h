#ifndef SECURITY_H
#define SECURITY_H

#include <string>

namespace Security {
    // Hashes a password using bcrypt
    std::string hashPassword(const std::string& password);

    // Verifies a password against a hash
    bool verifyPassword(const std::string& password, const std::string& hash);
}

#endif
