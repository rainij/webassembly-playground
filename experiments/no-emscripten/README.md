# Experiment - Using Webassembly without Emscripten

In this example we explore using WASM *without* emscripten. We do this mainly for didactic reasons. In particular we learn to appriciate what emscripten acutally does for us. We also have a short glimpse at WASI (Webassembly System Interface).

## Building and running the examples

Everything can be build by `make`:

```shell
$ mkdir -p dist
$ make [<targets>]
```

Possible targets are (see also the `Makefile`):

- `default`: For building an example which can be run in the browser. This needs `clang` to be installed.
- `wasi`: This is a tiny "Hello World" example demonstrating WASI outside the web. For this to run, at least the *wasi-sysroot* from the wasi-sdk has to be available (compare with the Makefile where to place it). Everything needed can be downloaded from [here][wasi-sdk]. Moreover, if you have issues with `libclang_rt.builtins-wasm32.a` a solution is provided there.
- `default-wat`, `wasi-wat`: WASM is a binary format. If you install [wabt][wabt] (some distros like Fedora have it in their package manager), these targets provide a corresponding textual representation (wat-files).
- `all`: All of the above targets.

To run the `default` target do the following and open the browser on the specified site:

```shell
$ ./serve-default.sh [<PORT_NUMBER>]
```

To run the `wasi` target in `wasmtime` (must be installed, e.g. from [here][wasmtime]):

```shell
$ wasmtime dist/main.wasm
```

## Explanations

Compiling to wasm is supported by `clang` out of the box, since version 8 (if used together with the `llvm` compiler infrastructure). In the following an excerpt from the Makefile (with minor modifications, to be self contained):

```makefile
dist/bindings.wasm: src/bindings.cpp
	clang++ --target=wasm32 $(OTHER_OPTIONS) -nostdlib -Wl,--no-entry -Wl,--allow-undefined -fvisibility=hidden -Wl,--export-dynamic -o $@ $^
```

The first thing to note is `--target=wasm32`. Here we specify the so called *target triple*, which contains three pieces of information `<machine-vendor-os>`. One can omit some of the pieces, `wasm32` is short for `wasm32-unknown-unknown`. The first entry states the machine (more precisely: the instruction set architecture) for which the code gets compiled. In our case it is `wasm32`, which means "Webassembly Stack Machine with 32 bit pointers" (there is also `wasm64`). The second entry (the vendor, or manufacturer, which might be `ibm` or `pc`) is almost always unimportant - as it is here. So the `unknown` entry can be read as *irrelevant*. When targeting the *browser*, currently one does not specify the "operating system" part of the target triple.

By default `clang++` pulls in the `C/C++` standard libraries `-lc++`, `-lc++abi`, `-lc`. However, for our target (wasm in the browser) clang cannot find any implementation of these libs. The reason is that many library functions (like `fopen` for opening files), need to make *syscalls* in order to fullfill their job. In the browser these syscalls have to be implemented in javascript (this is one thing emscripten does). This is the reason why we need `-nostdlib`. It prevents clang from searching for the standard libs. Of course this means we cannot use the standard library *out of the box*!

Actually there are implementations of the `C/C++` standard libaries for wasm, for example `wasi-libc`. WASI stands for "Webassembly System Interface". The project was born in 2019. To ease the use of the library the `wasi-sdk` was developed. You can [get wasi-sdk][wasi-sdk] from WebAssembly github repo. However, WASI is *mainly* meant to be used *outside* the browser. The reason is that WASI is implemented for a POSIX-like environment. There are dedicated runtimes, like `wasmtime`, `wasmer` or `lucet-wasi` which can directly run wasm-files (if they have a main function). We have a look into this later. Actually it is possible to use WASI in the browser, as long as you only use things which do not rely on syscalls. Otherwise, for example if you use `std::cout` you might observe imports in your wat-file like the following

```wasm
  (import "wasi_snapshot_preview1" "fd_write" (func $__wasi_fd_write (type 9)))
```

These would lead to a missing function when running in the browser. Emscripten solves the problem by injecting a reasonable implementation of `wasi_snapshot_preview1.fd_write` into the `importObject`, the second argument, of `Webassembly.instantiateStreaming(...)`. This happens in the js glue code emitted by emscripten. Of course, if one only needs very few pieces of the standard lib, then one might implement these pieces "by hand". There is an interesting github repo which implements a [tiny stdlib for demo purposes][nano-libc]. In *our* example we only need a way to print a string to the browser's console (in js we would use `console.log`). In WASM this is a non-trivial task since Webassembly (currently) only supports integer and floating point data types. Everything else (including strings) have to be passed by raw bytes. We accomplished that by passing a function `printByteString` (see `src\mymodule.js`) as an `import` to WASM. Observe that `dist/bindings.wat` contains a line:

```wasm
  (import "env" "printByteString" (func $printByteString (type 1)))
```

which precisely means that the wasm module expects this function to be implemented by the environment. We note that once the [interface types proposal][interface-types] is implemented this cumbersome approach (passing raw bytes around) should be obsolete.

The linker option `--no-entry` is needed to to suppress (the linker) `wasm-ld` erroring out on a missing entry symbol `_start`.

The linker option `--allow-undefined` is related to the above statements on `import`. Our WASM-module contains symbols like `printByteString` which are not defined in that module, nor are they dynamically linked into the module. These symbols are provided by the javascript code invoking the module. Hence clang can not find them. To handle this specific use case the linker must be informed that it is OK that some symbols are not defined. Note thate there is an option `--allow-undefined-file=<file>` to specify, pricisely *which* symbols are expected to be undefined (see `wasm-ld --help`).

Finally the two options `-fvisibility=hidden`, `-Wl,--export-dynamic` together with the macro

```cpp
// see src/bindings.cpp
#define WASM_EXPORT [[gnu::visibility("default")]] extern "C"
```

provide us with a way to specify which functions to export in our module. These are the functions which can be used from the javascript code. We remark that `extern "C"` is just needed to avoid C++ name-mangling rules. The exported functions can be observed in the wat-file:

```wasm
  (export "say_hello" (func $say_hello))
```

Instead of these three pieces we could just use `--export-all` to export everything. However, in that case helper functions like `strlen` would be exported too. By the way, `[[gnu::visibility("default")]]` is called an *attribute specifier*. We note that the pattern to use the flag `-fvisibility=hidden` together with `[[gnu::visibility("default")]]` within the code [is recommendend when creating shared libraries][gnu-visibility]. There is a documentation on the standardized *syntax* for [attribute specifier sequences][attr-specifier] on cppreference.com.

We already mentioned WASI. We included a very simply "Hello World"-style example for use of WASI together with the `wasmtime` runtime (any other WASM-WASI-runtime would be OK too). To build a wasmtime-executable, which prints a string to stdout and hence uses the stdlib, we added the following line to the Makefile:

```makefile
dist/main.wasm: src/main.cpp
	clang++ --target=wasm32-unknown-wasi $(OTHER_OPTIONS) --sysroot=$(WASI_SYSROOT) -o $@ $^
```

Note that we specify `wasi` in the os-part of the target triple. This is important to find the *correct* versions of the standard library binaries its helper files. We note that they typically reside in a folder called `wasm32` or `wasm32-wasi` within the *sysroot*. The option `--sysroot=<directory>` is needed if wasi-libc is not installed into the "normal" sysroot (e.g. `/usr/`).

[wasi-sdk]: https://github.com/WebAssembly/wasi-sdk
[nano-libc]: https://github.com/PetterS/clang-wasm
[gnu-visibility]: https://gcc.gnu.org/wiki/Visibility
[attr-specifier]: https://en.cppreference.com/w/cpp/language/attributes
[interface-types]: https://github.com/WebAssembly/interface-types/blob/master/proposals/interface-types/Explainer.md
[wabt]: https://github.com/WebAssembly/wabt
[wasmtime]: https://wasmtime.dev/
