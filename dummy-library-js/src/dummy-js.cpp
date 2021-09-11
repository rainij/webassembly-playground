#include <emscripten/bind.h>

#include "dummy/stuff.h"

using namespace emscripten;

// A function not available in the original libdummy.
float wmean(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

// For documentation on embind see:
// https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#embind
EMSCRIPTEN_BINDINGS(my_module) {
    function("wmean", &wmean)
        ;

    function("theAnswerPlus", &dummy::the_answer_plus)
        ;

    function("sayHello", &dummy::say_hello)
        ;

    function("prependHello", &dummy::prepend_hello)
        ;

    class_<dummy::MyClass>("MyClass")
        .constructor<int>()
        .property("attachment", &dummy::MyClass::attachment)
        .function("incrementX", &dummy::MyClass::increment_x)
        .property("x", &dummy::MyClass::get_x, &dummy::MyClass::set_x)
        .class_function("getClassName", &dummy::MyClass::get_class_name)
        ;
}
