# Experiment - Writing wasm by bare hands

We write a very simple wasm module directly within the wasm text format `wat`. This module provides a function which calculates the factorial of a number and logs it to stdout. The actual logging functionality must be provided by the embedder (`node` in this case), since wasm has no interface to something like stdout.

## Build and execute the example

To build everything make sure [wabt][wabt] is installed. More precisely we need `wat2wasm` to translate the text representation of our wasm module to its binary format (`wasm`). Now do the following

```shell
$ mkdir dist
$ make
```
Run the example as follows:

```shell
$ node dist/factorial.js 5
```

The terminal should show the factorials of all positive integers up to five:

```
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
```

[wabt]: https://github.com/WebAssembly/wabt

## Very short intro to the wasm format

The wasm text format is essentially a one to one translation of the binary format. Wasm is implemented as the language of a (virtual) stack machine. In contrast to most other (real) assembly languages it is *structured*. In particular this means that there is no jump instruction. Instead this functionality is replaced by structured control flow instructions like `if-else` and `loop` blocks.

Let us look at a simple code snippet which increments an integer `$i` by one (we remark that all non-keyword identifier must start with a dollar sign).

```wasm
;; this is a comment
;; suppose stack = [], i of type i32 and i = 3 in the following
local.get $i ;; stack = [3]
i32.const 1  ;; stack = [3, 1]
i32.add      ;; stack = [4]
local.set $i ;; stack = []
```

The first instruction `local.get <varname>` takes a local variable and puts its value on the stack. The second instruction puts the constant value `1`, which is declared to be of integer type `i32`, on the stack. The `i32.add` instruction takes two elements from the stack and puts back its sum. Finally `local.set <varname>` takes one value from the stack and asigns it to a local variable.

Wasm's type system guarantees that at each line of code it is known how many elements of which data-type are on the stack. Of course at runtime a function provided by the embedder may return other data types then declared in the wasm-module. However, in that case wasm `traps`, which means it aborts execution. In particular the following code snippet is easily verifiable to be invalid due to the fact that an add-instruction needs two elements on the stack:

```wasm
;; suppose stack = [<i32>] (statically known)
i32.add ;; error at compile time
```

This code would not pass the validation step at compile time (`WebAssembly.instantiate`). Moreover tools like `wat2wasm` would complain too, and reject to translate this to binary.

### Further Reading

For everyone keen to learn `wat` we recommend the book [The Art of WebAssembly][ArtOfWasm].

[ArtOfWasm]: https://wasmbook.com/
