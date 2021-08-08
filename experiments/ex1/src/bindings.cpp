#include <emscripten/bind.h>

#include "dummy-cpp-project/stuff.h"

using namespace emscripten;

float wmean(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

void wrapped_say_hello() {
    dummy_cpp_project::say_hello();
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("wmean", &wmean);
    function("wrapped_say_hello", &wrapped_say_hello);
    function("wrapped_say_hello", &wrapped_say_hello);
    function("the_answer_plus", &dummy_cpp_project::the_answer_plus);
}
