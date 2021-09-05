# JavaScript bindings (embind) for libdummy - `dummy-js`

`dummy-js` is a javascript wrapper library for the C++ library `dummy`.

You need `emscripten` and an emscripten-build of the `dummy` library available. See `Makefile` for the details. In order to build `dummy-js` do the following:

```shell
$ make
```

**TODOs:**

- TypeScript support.
- Use another Build-system then `make`. E.g. `cmake` again. What about `bazel` (used by tensorflow)?
