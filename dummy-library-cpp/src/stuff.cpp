#include <stdio.h>

#include "dummy/stuff.h"

// transform x into a string:
#define quote(x) #x

namespace dummy {
    void say_hello() {
        printf("Hello Sir!\n");
    }

    int the_answer_plus(int n) {
        return 42 + n;
    }

    std::string prepend_hello(std::string const& text) {
        return std::string("Hello ") + text;
    }

    MyClass::MyClass(int i) : x{i} {}

    void MyClass::increment_x() {
        ++x;
    }

    int MyClass::get_x() const {
        return x;
    }

    void MyClass::set_x(int new_x) {
        x = new_x;
    }

    std::string MyClass::get_class_name() {
        return quote(MyClass);
    }
}


