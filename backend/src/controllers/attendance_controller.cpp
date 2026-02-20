#include "controllers/attendance_controller.h"

namespace AttendanceController {
crow::json::wvalue getAttendance() {
  crow::json::wvalue res;
  res["student1"] = "Present";
  res["student2"] = "Absent";
  return res;
}
} // namespace AttendanceController
