add_library(libdummy
    stuff.cpp
)

set_target_properties(libdummy
    PROPERTIES
        OUTPUT_NAME dummy
)

target_include_directories(libdummy
    PUBLIC
        $<BUILD_INTERFACE:${INCLUDE_DIR}>
        $<INSTALL_INTERFACE:include>
)

target_compile_options(libdummy PRIVATE
    $<$<OR:$<CXX_COMPILER_ID:Clang>,$<CXX_COMPILER_ID:GNU>>:-Wall -Wextra -Wpedantic>
)

## install directives ########################################################

install(
    TARGETS libdummy
    EXPORT dummy-targets
    DESTINATION ${CMAKE_INSTALL_LIBDIR}
)
