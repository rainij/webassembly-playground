# Experiments

This directory contains several very simple and self contained examples using either emscripten or webassembly directly. Each example is build by a simple `Makefile`. Hence it is rather simple to understand what compiler or compiler flags are needed for which approach.

This directory contains the following:

- `bare-hands/`: Low level approach writing code in the wasm-textformat and using the WebAssembly API of JavaScript.
- `bare-clang/`: Using Clang (directly) and the WebAssembly API of JavaScript.
- `basic-emscripten/`: Basic usage of emscripten sufficient for C bindings (as opposed to C++ bindings).
- `embind-emscripten/`: Using the embind interface of emscripten which is suitable for C++ bindings.

**TODOs:**

- WebIDL example

