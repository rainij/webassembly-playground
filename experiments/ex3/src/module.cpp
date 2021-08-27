#include <math.h>
#include <stdio.h>

#include <emscripten.h>

// Essentially we write a C-module, although it is *formally* a C++-module.
extern "C" {
    // Use macro EMSCRIPTEN_KEEPALIVE to prevent dead code elimination from removing a symbol.
    EMSCRIPTEN_KEEPALIVE int intSqrt(int x) {
        return sqrt(x);
    }

    EMSCRIPTEN_KEEPALIVE int saySomething() {
        printf("Hallo, was geht?\n"); // Without \n the browser console does not show this - sometimes.
        return 28;
    }

    // Recall: an array of doubles is just a pointer to double.
    EMSCRIPTEN_KEEPALIVE double norm(double const * vector, unsigned long size) {
        printf("calling 'norm' with vector = %p, size = %lu\n", vector, size);
        double sum = 0.0;
        for (unsigned long i = 0; i < size; ++i) {
            sum += vector[i] * vector[i];
        }
        return sqrt(sum);
    }

    EMSCRIPTEN_KEEPALIVE int * squareAll(int const * integers, unsigned long size) {
        printf("calling 'squareAll' with integers = %p, size = %lu\n", integers, size);
        int * result = (int*) malloc(size); // NOTE: User of squareAll must free this memory !!!
        for (unsigned long i = 0; i < size; ++i) {
            result[i] = integers[i] * integers[i];
        }
        return result;
    }
}