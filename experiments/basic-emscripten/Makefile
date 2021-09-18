COMPILER := emcc

# Optimizations should be turned on:
# - -Os: all -O2 optimizations + optimizations saving binary size.
# - --closure 1: Run the closure compiler to optimize js-glue code.
# - -s FILESYSTEM=0 since we really do not need filesystem support
#   (however, no big effect for us).
# The -O0 option is usefull for debugging and for inspecting the js glue code.
OPTIMIZATION := -Os --closure 1 -s FILESYSTEM=0 
#OPTIMIZATION := -O0 -s ASSERTIONS=2

# NOTE: --pre-js gets literally inserted into the js-glue-code (somewhere near the begining).
OPTIONS := \
  --pre-js src/pre-js.js \
  --post-js src/post-js.js

# js compiler options:
# - EXPORTED_RUNTIME_METHODS: specify which runtime methods we want to use after importing the module (see index.html).
# - EXPORTED_FUNCTIONS: We could specify our own exported functions from module.cpp here, but this is not needed
#   since we already marked them as 'EMSCRIPTEN_KEEPALIVE'. However, we specify which stdlib functionality we need (see index.html).
SOPTS = \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -s EXPORTED_RUNTIME_METHODS=ccall,cwrap,getValue \
    -s EXPORTED_FUNCTIONS=_malloc,_free

.PHONY: all clean default

default: dist/module.js dist/index.html

all: default dist/module.wat

dist/%.js: src/%.cpp src/pre-js.js src/post-js.js
	$(COMPILER) $< -o $@ $(SOPTS) $(OPTIMIZATION) $(OPTIONS)

dist/%.html: src/%.html
	cp $^ $@

dist/%.wat: dist/%.wasm
	wasm2wat $^ -o $@

clean:
	rm -f dist/*
