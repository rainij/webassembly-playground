# Note: using "?=" means you can override this varaible from command line like so:
# $ make COMPILER=/path/to/my/emcc
COMPILER ?= emcc
# For debugging turn of OPTIMIZATION:
OPTIMIZATION := -Os --closure 1
#OPTIMIZATION := -O0

# By default we search for libdummy just outside the repo:
# It is necessary that this version of libdummy is build by emscripten!
LIBDUMMY_PREFIX ?= ../../dist

INCLUDE := -I $(LIBDUMMY_PREFIX)/include
LIB := $(LIBDUMMY_PREFIX)/lib/libdummy.a

# The option "-s ENVIRONMENT=web" prevents emscripten from emitting code which is not needed by a web-environment
# (e.g. functionality for usage in *node*).
SOPTS := \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s ENVIRONMENT=web

.PHONY: all clean default
default: dist/index.js dist/dummy-js.js

all: default dist/dummy-js.wat

clean:
	rm -f dist/*

# Creates (implicitly) the dummy-js.wasm and its cooresponding js glue code for the web:
dist/dummy-js.js: src/dummy-js.cpp
	$(COMPILER) $(OPTIMIZATION) --bind $(SOPTS) -o $@ $^ $(INCLUDE) $(LIB)

# This is the entry point for a consumer of libdummy-js:
dist/index.js: src/index.js
	cp $^ $@

# Just for debugging - the textual representation of the wasm output. Needs 'wabt' to be installed.
dist/%.wat: dist/%.wasm
	wasm2wat $^ -o $@
