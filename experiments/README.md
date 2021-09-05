# Experiments

This directory contains several very simple and self contained examples using either emscripten or webassembly directly. Each example is build by a simple `Makefile`. Hence it is rather simple to understand what compiler or compiler flags are needed for which approach.

This directory contains the following:

- `no-emscripten/`: Using WebAssembly directly via the WebAssembly API.
- `basic-emscripten/`: Basic usage of emscripten sufficient for C bindings (as opposed to C++ bindings).
- `embind-emscripten/`: Using the embind interface of emscripten which is suitable for C++ bindings.

**TODOs:**

- WebIDL example
- Improve embind-emscripten by showing how to use a class.
