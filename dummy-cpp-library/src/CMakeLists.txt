add_library(libdummycppproject SHARED
    stuff.cpp
)

set_target_properties(libdummycppproject
    PROPERTIES
        OUTPUT_NAME dummycppproject
)

target_include_directories(libdummycppproject
    PUBLIC
        $<BUILD_INTERFACE:${INCLUDE_DIR}>
        $<INSTALL_INTERFACE:include>
)

target_compile_options(libdummycppproject PRIVATE
    $<$<OR:$<CXX_COMPILER_ID:Clang>,$<CXX_COMPILER_ID:GNU>>:-Wall -Wextra -Wpedantic>
)

## install directives ########################################################

install(
    TARGETS libdummycppproject
    EXPORT dummycppproject-targets
    DESTINATION ${CMAKE_INSTALL_LIBDIR}
)
