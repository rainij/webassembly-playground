CXX := emcc
CXXFLAGS := -O0

DUMMYCPPLIB_PATH := ../dist

INCLUDE := -I $(DUMMYCPPLIB_PATH)/include
LIB := $(DUMMYCPPLIB_PATH)/lib/libdummycppproject.a

SOPTS = \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1

.PHONY: all clean
all: bundle/bindings.js bundle/mymodule.js

clean:
	rm -f bundle/*

# Also creates a corresponding wasm file
bundle/bindings.js: src/bindings.cpp
	$(CXX) $(CXXFLAGS) --bind $(SOPTS) -o $@ $^ $(INCLUDE) $(LIB)

bundle/mymodule.js: src/mymodule.js
	cp $^ $@
