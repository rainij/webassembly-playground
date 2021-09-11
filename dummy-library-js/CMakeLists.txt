cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

project(dummy-js
    VERSION 0.0.1
    DESCRIPTION "A javascript wrapper for libdummy."
    LANGUAGES CXX
)

# Here we print the currently used compiler. If CMAKE_TOOLCHAIN_FILE is set correctly
# the variable CMAKE_CXX_COMPILER should point to em++ from the emsdk.
message("CMAKE_CXX_COMPILER=${CMAKE_CXX_COMPILER}")

# Locate the original c++ dummy library:
find_package(Dummy 0 REQUIRED CONFIG)

# This builds the glue code (dummy-js.js).
# There seems to be no good wasm support in cmake at the moment, therefore we have to treat the
# glue-code like an executable. Moreover cmake is not aware that the glue code (normally) is
# supplemented with a wasm file, containing the actual build output.
add_executable(dummy-js
    src/dummy-js.cpp
)

target_link_libraries(dummy-js Dummy::libdummy)

# On command line you can override this like that: -DOPTIMIZATION_LINK="-O0;--closure=0"
# Note: Link time optimization (-flto) may be *more* interesting for larger projects.
set(OPTIMIZATION_COMPILE -O2 CACHE STRING "Optimization options for the compiler")
set(OPTIMIZATION_LINK -O2 --closure=1 CACHE STRING "Optimization options for the linker")

# See /path/to/.emsdk/upstream/emscripten/src/settings.js for all emscripten build options:
set(SOPTS_COMPILE CACHE STRING "Emscripten build options [compile]")
set(SOPTS_LINK
    -sMODULARIZE=1 -sEXPORT_ES6=1 -sENVIRONMENT=web
    CACHE STRING "Emscripten build options [link]"
)

target_compile_options(dummy-js PRIVATE
    ${OPTIMIZATION_COMPILE} ${SOPTS_COMPILE}
)
target_link_options(dummy-js PRIVATE
    --bind ${OPTIMIZATION_LINK} ${SOPTS_LINK}
)

# Note: cmake is not aware of the wasm file, hence we have to install it manually.
install(
    TARGETS dummy-js
    DESTINATION wasm
)
install(
    FILES 
        ${CMAKE_CURRENT_BINARY_DIR}/dummy-js.wasm
    DESTINATION wasm
)
