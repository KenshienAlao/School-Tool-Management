#ifndef ATTENDANCE_CONTROLLER_H
#define ATTENDANCE_CONTROLLER_H

#include "crow.h"

namespace AttendanceController {
crow::json::wvalue getAttendance();
}

#endif
