# Experiment - Using Emscripten Embind

This is a basic example demonstrating how to use [embind][embind] to wrap C++ code. We also demonstrate how to include the `dummy` library. We focus on setting up the build infrastructure.

To build this example install the `dummy` library into `../../../dist/` (see also the Makefile) and do the following

```shell
$ mkdir -p dist
$ make [<targets>]
```
See the Makefile for possible targets.

To run the example do

```shell
$ ./serve-all.sh [<PORT_NUMBER>]
```
[embind]: https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html
