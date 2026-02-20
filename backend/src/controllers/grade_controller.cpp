#include "controllers/grade_controller.h"

namespace GradeController {
crow::json::wvalue getGrades() {
  crow::json::wvalue res;
  res["Math"] = "A";
  res["Science"] = "B+";
  return res;
}
} // namespace GradeController
