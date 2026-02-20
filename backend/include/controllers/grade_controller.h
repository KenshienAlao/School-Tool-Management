#ifndef GRADE_CONTROLLER_H
#define GRADE_CONTROLLER_H

#include "crow.h"

namespace GradeController {
crow::json::wvalue getGrades();
}

#endif
