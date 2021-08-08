# Dummy C++ Library

We made this very simple dummy library to investigate how to convert a C++ library into an npm package by using emscripten.

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

## Webassembly (Emscripten) support

To use this library in a webassembly project we have to wrap most `cmake` and `make` invocations by tools from the `emsdk`. Moreover, shared libraries are not supported by webassembly which means that we have to build static archives.

Hence, to build the library we do

```shell
$ mkdir build_emscripten && cd build_emscripten
$ emcmake cmake .. -DBUILD_SHARED_LIBS=OFF [-DCMAKE_EXPORT_PACKAGE_REGISTRY=ON]
$ emmake make
```

The installation command *must not* (TODO: reason?) be wrapped by `emsdk`. So to install everything into the experiments directory do this:

```shell
$ cmake --install . --prefix ../../experiments/dist
```
