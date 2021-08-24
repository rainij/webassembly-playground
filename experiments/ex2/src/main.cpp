#include <iostream>

using namespace std;

int main() {
    // Compiling this with wasi leads to (import "wasi_snapshot_preview1" ... in the wat-file.
    // Therefore would not run in the browser (unless these imports are provied by the user of the library).
    // However in a runtime like wasmtime these imports are provided.
    cout << "Hello WASI and wasmtime!" << endl;
}
