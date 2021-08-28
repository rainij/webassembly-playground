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
default: bundle/bindings.js bundle/mymodule.js bundle/index.html

all: default bundle/bindings.wat

clean:
	rm -f bundle/*

# Also creates a corresponding wasm file
bundle/bindings.js: src/bindings.cpp
	$(COMPILER) $(OPTIMIZATION) --bind $(SOPTS) -o $@ $^ $(INCLUDE) $(LIB)

bundle/mymodule.js: src/mymodule.js
	cp $^ $@

bundle/index.html: src/index.html
	cp $^ $@

# Needs 'wabt' to be installed.
bundle/%.wat: bundle/%.wasm
	wasm2wat $^ -o $@
