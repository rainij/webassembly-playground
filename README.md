# WebAssembly Playground

Our goal is to find a convenient setup to make an npm package from a C++ library. 

This repo contains the following

- `dummy-library-cpp/`: A `dummy` C++ library to generate an npm package from.
- `experiments/`: Some small javascript examples using `WebAssembly` either directly via the Browser API or via emscripten. Some of these examples use our `dummy` library, others are self-contained.
- `consumers/`: Sample projects (JavaScript and pure C++) using `dummy`.
- **TODO** wasm bindings for `dummy`.

