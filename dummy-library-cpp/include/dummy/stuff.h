#ifndef STUFF_H
#define STUFF_H

#include <string>

namespace dummy {
    void say_hello();
    int the_answer_plus(int n);
    std::string prepend_hello(std::string const& text);

    class MyClass {
      private:
        int x;

      public:
        MyClass(int x = 0);

        std::string attachment = "Hallo";

        void increment_x();

        int get_x() const;
        void set_x(int new_x);

        static std::string get_class_name();
    };
}

#endif // STUFF_H
