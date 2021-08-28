cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

project(dummy
    VERSION 0.0.1
    DESCRIPTION "A dummy C++ project for demonstrating usage of webassembly/emscripten."
    LANGUAGES CXX
)

## cmake includes ############################################################

include(CMakePackageConfigHelpers)
include(GNUInstallDirs)

## configurable/global options and variables #################################

option(BUILD_SHARED_LIBS "Global flag to cause add_library() to create shared libraries if on." ON) # Builtin
option(CMAKE_EXPORT_PACKAGE_REGISTRY "Export build tree to cmake user package registry" OFF) # Builtin

set(TOP_DIR ${CMAKE_CURRENT_LIST_DIR})
set(SRC_DIR ${TOP_DIR}/src)
set(INCLUDE_DIR ${TOP_DIR}/include)

message("BUILD_SHARED_LIBS=${BUILD_SHARED_LIBS}")
message("CMAKE_EXPORT_PACKAGE_REGISTRY=${CMAKE_EXPORT_PACKAGE_REGISTRY}")

## subdirectories ############################################################

add_subdirectory(src)

## install directives ########################################################

install(DIRECTORY include/ DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})

install(EXPORT dummy-targets
    NAMESPACE Dummy::
    FILE DummyTargets.cmake
    DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/dummy
)

configure_package_config_file(${CMAKE_CURRENT_LIST_DIR}/cmake/DummyConfig.cmake.in
    ${CMAKE_CURRENT_BINARY_DIR}/DummyConfig.cmake
    INSTALL_DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/dummy/ # TODO why providing this *here* ???
)

write_basic_package_version_file(
    ${CMAKE_CURRENT_BINARY_DIR}/DummyConfigVersion.cmake
    VERSION ${PROJECT_VERSION}
    COMPATIBILITY SameMajorVersion
)

install(
    FILES
        ${CMAKE_CURRENT_BINARY_DIR}/DummyConfig.cmake
        ${CMAKE_CURRENT_BINARY_DIR}/DummyConfigVersion.cmake
    DESTINATION
        ${CMAKE_INSTALL_LIBDIR}/cmake/dummy
)

## export directly from build tree ###########################################

export(EXPORT dummy-targets
    NAMESPACE Dummy::
    FILE DummyTargets.cmake
)

# If CMAKE_EXPORT_PACKAGE_REGISTRY=ON this exports the build tree to
# user package registry (on linux: ~/.cmake/packages/Dummy)
export(PACKAGE Dummy)
