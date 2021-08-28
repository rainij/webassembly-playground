# Dummy C++ Library

We made this very simple dummy library to investigate how to convert a C++ library into an npm package by using emscripten.

## Dependencies

The following dev-dependencies have to be installed:

- The Meta Build System [cmake][cmake].
- A Build System like [make][make] (install e.g. via package manager) or [ninja][ninja] (use `make` if in doubt).
- Emscripten, e.g. via the [emsdk][emsdk].

## Build and install

To build this library do the following

```shell
$ mkdir build && cd build
$ cmake .. [-DCMAKE_EXPORT_PACKAGE_REGISTRY=ON]
$ make
```

The option `CMAKE_EXPORT_PACKAGE_REGISTRY=ON` ensures that this library gets registered by the cmake registry (usually somewhere inside `~/.cmake/packages`) so that it can be used by other cmake projects without installing it somewhere.

However, installation is still very easy. Just do the following to install everything into your home directory

```shell
$ cmake --install . --prefix ~/dist
```

## WebAssembly (Emscripten) support

To use this library in a webassembly project we have to wrap most `cmake` and `make` invocations by tools from the `emsdk`. Moreover, in place of shared libraries one should link static libraries into the wasm project.

Hence, to build the library we do

```shell
$ mkdir build_emscripten && cd build_emscripten
$ emcmake cmake .. -DBUILD_SHARED_LIBS=OFF [-DCMAKE_EXPORT_PACKAGE_REGISTRY=ON]
$ emmake make
```

The installation command *must not* (TODO: reason?) be wrapped by `emsdk`. So to install everything into a folder just outside the directory do the following:

```shell
$ cmake --install . --prefix ../../../dist
```

[cmake]: https://cmake.org/
[make]: https://www.gnu.org/software/make/
[ninja]: https://ninja-build.org/
[emsdk]: https://emscripten.org/docs/getting_started/downloads.html#installation-instructions-using-the-emsdk-recommended
