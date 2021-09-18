# Experiment - Basic Emscripten Usage

Here we demonstrate how to use emscripten to wrap a simple C-library. We do *not* use `embind` nor `WebIDL` which might be more interesting for C++ code using classes.

# Building and running the example

We build everything by using `make`:

```shell
$ mkdir -p dist
$ make [<targets>]
```

By `default` no `wat`-files are build. To also build the wat-files specify `all` as target. However, `wabt` tools have to be installed for that.

Run the example in the browser by executing the following script:

```shell
$ ./serve-all.sh [<PORT_NUMBER>]
```

# Some remarks

- Besides the wasm-file, emscripten also emits js glue code (html would be possible too). This glue code contains the runtime for the wasm to run in. For example syscalls needed by the C standard library are implemented here. Moreover, the exported Module object (we set `-s MODULARIZE=1`) gets all exported C functions attached and lots of additional functionality. 
- Emscripten has the convention that *all* C-symbols are prepended with an underscore `_` within the js-glue code. For example `squareAll` (which we defined) and `malloc` (defined by emscripten) become `module._squareAll`, and `module._malloc`.
- Even library functions like `malloc` have to be exported *explicitly* (if needed). See the option `EXPORTED_FUNCTIONS` in the Makefile. Otherwise dead code elimination would eliminate these functions and we couldn't use them in js. This minimizes the bundle size.
- Emscripten provides the [function wrapper ccall][ccall] to call the C-functions indirectly. *Probably* one reason is that *currently* WASM natively supports only two kinds of data types: integers and floats. Everything else has to be treated by passing raw memory around. On the other hand I found this wrapper not to be particularly convenient. It is pretty limited as can be seen by inspecting the js glue code (set `OPTIMIZATION := -O0` in the Makefile for doing this). However for converting strings `ccall` might be convenient.
- To access the memory use one of the views `module.HEAP<datatype>` where *datatype* is one of `8, 16, 32, U8, U16, U32, F32, F64` ([see here for documentation][emscripten-heap]). These views are [typed arrays][typed-arrays] on the underlying buffer created by the emscripten runtime (see the glue code).
- You can view the documentation of the js compiler options `-s <SOME_OPTION>` in `/path/to/.emsdk/upstream/emscripten/src/settings.js` if you installed the [emsdk][emsdk].

[ccall]: https://emscripten.org/docs/api_reference/preamble.js.html?highlight=ccall#ccall
[typed-arrays]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
[emscripten-heap]: https://emscripten.org/docs/api_reference/preamble.js.html?highlight=heap#HEAP8
[emsdk]: https://emscripten.org/docs/getting_started/downloads.html#installation-instructions-using-the-emsdk-recommended
