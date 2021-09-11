# JavaScript bindings for libdummy - `dummy-js`

`dummy-js` is a javascript wrapper library for the C++ library `dummy`. Our approach is based on emscriptens `embind`. You need `emsdk` and an emscripten generated build of `libdummy` available. See `Makefile`, `CMakeLists.txt` and the README of `libdummy` for the details.

## Build

In order to build `dummy-js` do the following:

```shell
$ npm run build
```

Note that our top-level `Makefile` is just a very cheap *script* which has subcommands (like `configure` and `build`), which in turn call e.g. `cmake` to manage the actual build. In case you have to override some of the variables in the make-script you can invoke it directly like that:

```shell
$ make configure EMSDK=/other/path/to/emsdk
$ make build js EMSDK=/other/path/to/emsdk
```

To avoid setting the variables explicitly on each invocation you can also export each relevant variable to the shell-environment and then invoke `make` normally:

```
export EMSDK=/other/path/to/emsdk
make all
```

## Usage with webpack

A consumer project which uses a bundler must be prepared to treat the `wasm` files correctly. With webpack one has to add the following to the config:

```js
// webpack.config.js in a consumer project
module.exports.module.rules.push(
  {
    test: /\.wasm$/,
    type: 'javascript/auto',
    loader: 'file-loader',
  }
);

module.exports.experiments.topLevelAwait = true;
```

The first statement tells weback that an import of a wasm file should return the url of the wasm file (compare `src/index.js`). The second statement is needed since top-level-await (compare `src/index.js`) is still a pretty new feature (as of september 2021).

### Remark

Bundler still do not support wasm files very well. This may change if ES module support for wasm is in place. There are approaches to avoid delivering a second wasm file with the bundle. For example one can `base64` encode the wasm file and let the build tool directly insert the encoded module as the value of a variable in a js file (e.g. via `sed`). This has been done e.g. in [meshoptimizer][meshoptimizer] (compare also the Makefile in that repo). The corresponding js template *essentially* looks as follows:

```js
// meshoptimizer/js/meshopt_decoder.js
// ...
var wasm = "insert base64 encoding of the compiled wasm module here (via sed)";
// ...
var imports = /* not important here */;
// ...
var instance = {};
var promise = fetch('data:application/octet-stream;base64,' + wasm)
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, imports))
  .then(result => instance = result.instance);
```

A related approach has been done in [long/src/long.js][long]:

```js
// wasm optimizations, to do native i64 multiplication and divide
wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
])), {}).exports;
```

The corresponding `wat` was written by hand, compiled to wasm and transformed to the above `Uint8`-encoding. The resulting encoding was just directly pastet into the binary. Of course this is only mainainable for very small and few wasm-snippets.


## Troubleshooting

### Build fails with `make: cmake: Permission denied`

If you are in a shell with an activated `emsdk` and call `npm run build` this may happen. We do not know the reason for this, but a solution is to not use a shell with activated `emsdk`. Of course you still need `node` (from somewhere else).

### Strange warning: `warning: honoring legacy environment variable NODE.  Please switch to using EM_NODE_JS instead`

This warning is a `false positive` of a emscripten-mechanism warning the programmer not to use legacy environment variables anymore (https://github.com/emscripten-core/emscripten/pull/14968). In particular it is not a problem and can be ignored. In future versions of the emscripten sdk this may be merely a debug message.

In case you wonder why `NODE` is set at all: `npm run build` spawns a shell where this environment variable is set.

## TODO

- TypeScript support.
- Investigate if `bazel` (used by tensorflow) is a good alternative to cmake for building `libdummy-js`.

[long]: https://github.com/dcodeIO/long.js/blob/4.0.0/src/long.js#L9
[meshoptimizer]: https://github.com/zeux/meshoptimizer/blob/v0.12/js/meshopt_decoder.js#L5
