// To explicitly select which functions get exported we do two things:
// - Set -fvisibility=hidden at the command line invocation of the compiler.
// - Reset visibility to 'default' for each symbol we want to export.
// Search for 'export' in the wat-file to check that everything works out as described. 
#define WASM_EXPORT [[gnu::visibility("default")]] extern "C"
#define WASM_EXPORT_MANGLED [[gnu::visibility("default")]]

// These functions have to be provided by the environment.
// See the importObject in WebAssembly.instantiateStreaming(...).
// They are marked as 'import's in the wasm-module.
extern "C" void printByteString(char const *, unsigned long);
extern "C" void printInt(int);

WASM_EXPORT float wmean(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

// Without WASM_EXPORT (the visibility part) a functions wouldn't be exported.
// See wat-file to observe that this functions is not *export*ed.
void not_to_be_exported() {}

// Without an extern "C" everything gets mangled by C++ compiler.
// See the wat-file to observe the mangled name.
WASM_EXPORT_MANGLED float wmean_mangled(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

// Auxiliary function, which is not exported
unsigned long strlen(const char* start) {
   const char* end = start;
   for( ; *end != '\0'; ++end) {
       // Hack to avoid infinite loop if cstring is not null-terminated:
       if (end - start > 100) {
           break;
       }
   }
   return end - start;
}

WASM_EXPORT void say_hello() {
    printInt(123456); // just for fun
    const char* msg = "Hello from WASM!";
    printByteString(msg, strlen(msg));
}
