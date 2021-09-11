# WebAssembly Playground

Our goal is to find a convenient setup to make an npm package from a C++ library. 

This repo contains the following

- `dummy-library-cpp/`: A dummy C++ library `libdummy` to generate an npm package from.
- `dummy-library-js/`: A js wrapper for `libdummy` (uses wasm).
- `consumers/`: Sample projects (JavaScript and pure C++) using `libdummy`.
- `experiments/`: Some small javascript examples using `WebAssembly` either directly via the Browser API or via emscripten. Some of these examples use `libdummy`, others are self-contained.

