#include <emscripten/bind.h>

#include "dummy/stuff.h"

using namespace emscripten;

float wmean(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

void wrapped_say_hello() {
    dummy::say_hello();
}

// With embind the bindings are defined inside the source code:
EMSCRIPTEN_BINDINGS(my_module) {
    function("wmean", &wmean);
    function("wrapped_say_hello", &wrapped_say_hello);
    function("the_answer_plus", &dummy::the_answer_plus);
}
