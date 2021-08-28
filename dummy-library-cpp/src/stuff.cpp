#include <stdio.h>

#include "dummy/stuff.h"

void dummy::say_hello() {
    printf("Hello Sir!\n");
}

int dummy::the_answer_plus(int n) {
    return 42 + n;
}
