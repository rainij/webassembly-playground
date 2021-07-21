cmake_minimum_required(VERSION 3.16)

project(dummy-cpp-project
    VERSION 0.0.1
    DESCRIPTION "Dummy cpp project."
    LANGUAGES CXX
)

set(TOP_DIR ${CMAKE_CURRENT_LIST_DIR})
set(SRC_DIR ${TOP_DIR}/src)
set(INCLUDE_DIR ${TOP_DIR}/include)

add_subdirectory(src)
