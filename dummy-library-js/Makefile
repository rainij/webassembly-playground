EMSDK ?= $(HOME)/.emsdk
CMAKE_TOOLCHAIN_FILE ?= $(EMSDK)/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake
Dummy_DIR ?= ../../dist/lib/cmake/dummy/

BUILD_DIR ?= build
DIST_DIR ?= dist

.PHONY: all build configure clean default js

default: all
all: configure build js

# First step
# - To find libdummy we have to provide the parent directory of its config: Dummy_DIR.
# - To tell cmake to use the emsdk we provide the emsdk toolchain file.
#   This is essentially the same what 'emscmake cmake <args>' does.
configure:
	mkdir -p $(BUILD_DIR) $(DIST_DIR)
	cmake -S . -B $(BUILD_DIR) -DDummy_DIR=$(Dummy_DIR) -DCMAKE_TOOLCHAIN_FILE=$(CMAKE_TOOLCHAIN_FILE)

# Second step
# Build the wasm file, its glue code and copy everything into the bundle:
build: configure
	cmake --build $(BUILD_DIR) --parallel --verbose
	cmake --install $(BUILD_DIR) --prefix $(DIST_DIR)

# Third step
# copy the entry point of dummy-js into the bundle:
js: $(DIST_DIR)/index.js configure
$(DIST_DIR)/index.js: src/index.js
	cp $< $@

clean:
	rm -rf $(BUILD_DIR) $(DIST_DIR)
