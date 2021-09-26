# Note: Variables defined with '?=' can be overidden on command-line like so:
# make COMPILER=/path/to/my/clang++.
COMPILER ?= clang++
OPTIMIZATION := -O3

# Only needed for the wasi target.
WASI_SYSROOT ?= ../../../wasi-sysroot

.PHONY: all clean default wasi wat-default wat-wasi

# Result can be viewed from browser. Needs clang compiler.
default: dist/bindings.wasm dist/mymodule.js dist/index.html

# Result can be run e.g. by wasmtime. Needs wasi-libc to be available.
wasi: dist/main.wasm

# Creating Textual Webassembly (*.wat) for inspecting the wasm module. Needs 'wabt' to be installed.
wat-default: dist/bindings.wat
wat-wasi: dist/main.wat

all: default wasi wat-default wat-wasi

clean:
	rm -f dist/*

dist/bindings.wasm: src/bindings.cpp
	$(COMPILER) --target=wasm32 $(OPTIMIZATION) -nostdlib -Wl,--no-entry -Wl,--allow-undefined -fvisibility=hidden -Wl,--export-dynamic -o $@ $^

dist/main.wasm: src/main.cpp
	$(COMPILER) --target=wasm32-unknown-wasi $(OPTIMIZATION) --sysroot=$(WASI_SYSROOT) -o $@ $^

dist/%.wat: dist/%.wasm
	wasm2wat $^ -o $@

dist/mymodule.js: src/mymodule.js
	cp $^ $@

dist/index.html: src/index.html
	cp $^ $@
