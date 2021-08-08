cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

project(dummy-cpp-project
    VERSION 0.0.1
    DESCRIPTION "Dummy cpp project."
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

install(EXPORT dummycppproject-targets
    NAMESPACE Dummycppproject::
    FILE DummycppprojectTargets.cmake
    DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/dummycppproject
)

configure_package_config_file(${CMAKE_CURRENT_LIST_DIR}/cmake/DummycppprojectConfig.cmake.in
    ${CMAKE_CURRENT_BINARY_DIR}/DummycppprojectConfig.cmake
    INSTALL_DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/dummycppproject/ # TODO why providing this *here* ???
)

write_basic_package_version_file(
    ${CMAKE_CURRENT_BINARY_DIR}/DummycppprojectConfigVersion.cmake
    VERSION ${PROJECT_VERSION}
    COMPATIBILITY SameMajorVersion
)

install(
    FILES
        ${CMAKE_CURRENT_BINARY_DIR}/DummycppprojectConfig.cmake
        ${CMAKE_CURRENT_BINARY_DIR}/DummycppprojectConfigVersion.cmake
    DESTINATION
        ${CMAKE_INSTALL_LIBDIR}/cmake/dummycppproject
)

## export directly from build tree ###########################################

export(EXPORT dummycppproject-targets
    NAMESPACE Dummycppproject::
    FILE DummycppprojectTargets.cmake
)

# If CMAKE_EXPORT_PACKAGE_REGISTRY=ON this exports the build tree to
# user package registry (on linux: ~/.cmake/packages/Sensana)
export(PACKAGE Dummycppproject)
