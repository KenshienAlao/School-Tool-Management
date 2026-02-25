cmake_minimum_required(VERSION 3.10)

# name
project(SchoolBackend)

# c++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
 
# Use ccache if available
find_program(CCACHE_FOUND ccache)
if(CCACHE_FOUND)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ccache)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_LINK ccache)
endif()

# include directory
include_directories(include)

# source files
set(SOURCES 
    src/main.cpp 
    src/config/db.cpp
    src/config/database.cpp
    src/routes/routes.cpp
    src/controllers/auth_controller.cpp
    src/controllers/attendance_controller.cpp
    src/controllers/course_controller.cpp
    src/controllers/grade_controller.cpp
    src/controllers/section_controller.cpp
    src/controllers/student_controller.cpp
    src/controllers/task_controller.cpp
    src/utils/security.cpp
)

# compile and name
add_executable(backend_app ${SOURCES})

# pthreads
find_package(Threads REQUIRED)

# OpenSSL for JWT
find_package(OpenSSL REQUIRED)

# MySQL
find_package(PkgConfig REQUIRED)
pkg_check_modules(MYSQL REQUIRED mysqlclient)

target_link_libraries(backend_app 
    Threads::Threads
    OpenSSL::SSL
    OpenSSL::Crypto
    ${MYSQL_LIBRARIES}
    crypt
)

# Include MySQL headers
target_include_directories(backend_app PRIVATE ${MYSQL_INCLUDE_DIRS})
