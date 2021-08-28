cmake_minimum_required(VERSION 3.16 FATAL_ERROR)
project(consumer VERSION 0.0.1 LANGUAGES CXX)

add_executable(consumer src/main.cpp)

find_package(Dummy 0 REQUIRED CONFIG)
target_link_libraries(consumer Dummy::libdummy)
