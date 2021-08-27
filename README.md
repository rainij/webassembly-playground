# WebAssembly Playground

Our goal is to find a convenient setup to make an npm package from a C++ library. 

This repo contains the following

- `dummy-cpp-library/`: A C++ library to generate an npm library from.
- `consumer_cpp/`: A tiny C++ project which uses the C++ version of the dummy library (just for completeness). 
- `experiments/`: Some small javascript examples using `WebAssembly` either directly via the Browser API or via emscripten. Some of these examples use our `dummy-cpp-library`, others are self-contained.

