# WebAssembly Playground

Our goal is to find a convenient setup to make an npm package from a C++ library. 

This repo contains the following

- `dummy-library-cpp/`: A dummy C++ library `libdummy` to generate an npm package from.
- `dummy-library-js/`: A js wrapper for `libdummy` (uses wasm).
- `consumers/`: Sample projects (JavaScript and pure C++) using `libdummy`.
- `experiments/`: Some small javascript examples using `WebAssembly` either directly via the Browser API or via emscripten. Some of these examples use `libdummy`, others are self-contained.

If you clone this repo locally it is advisable that you put it into another folder. The reason is that some parts of the repo assume that you put some things next to the repo folder.

## vscode support

This directory contains a vscode workspace file. You can open it like so:

```shell
$ code webassembly-playground.code-workspace
```

Some vscode settings depend on certain things available next to the repo directory. For example, for full vscode intellisense, vscode needs to know where the `emsdk` is installed. To achieve this you could point a symbolic link to the installation path of `emsdk`:

```shell
$ ln -s ../.emsdk /path/to/your/emsdk
```

