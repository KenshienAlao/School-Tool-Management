#include "utils/security.h"
#include <crypt.h>
#include <iostream>
#include <vector>

namespace Security {

std::string hashPassword(const std::string &password) {
  char salt[64];
  // $2y$ is the bcrypt prefix, 12 is the work factor (rounds)
  if (crypt_gensalt_rn("$2y$", 12, nullptr, 0, salt, sizeof(salt)) == nullptr) {
    return "";
  }

  struct crypt_data data;
  data.initialized = 0;
  char *hashed = crypt_r(password.c_str(), salt, &data);

  if (hashed == nullptr) {
    return "";
  }

  return std::string(hashed);
}

bool verifyPassword(const std::string &password, const std::string &hash) {
  if (hash.empty())
    return false;

  struct crypt_data data;
  data.initialized = 0;
  char *hashed = crypt_r(password.c_str(), hash.c_str(), &data);

  if (hashed == nullptr) {
    return false;
  }

  return std::string(hashed) == hash;
}

} // namespace Security
