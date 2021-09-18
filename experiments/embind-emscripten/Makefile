COMPILER ?= emcc
# For debugging turn of OPTIMIZATION:
OPTIMIZATION := -Os --closure 1
#OPTIMIZATION := -O0

# Just outside the repo itself:
LIBDUMMY_PREFIX ?= ../../../dist

INCLUDE := -I $(LIBDUMMY_PREFIX)/include
LIB := $(LIBDUMMY_PREFIX)/lib/libdummy.a

SOPTS := \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1

.PHONY: all clean default
default: dist/bindings.js dist/mymodule.js dist/index.html

all: default dist/bindings.wat

clean:
	rm -f dist/*

# Also creates a corresponding wasm file
dist/bindings.js: src/bindings.cpp
	$(COMPILER) $(OPTIMIZATION) --bind $(SOPTS) -o $@ $^ $(INCLUDE) $(LIB)

dist/mymodule.js: src/mymodule.js
	cp $^ $@

dist/index.html: src/index.html
	cp $^ $@

# Needs 'wabt' to be installed.
dist/%.wat: dist/%.wasm
	wasm2wat $^ -o $@
