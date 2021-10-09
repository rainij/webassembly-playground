EMSDK ?= ../../.emsdk
CMAKE_TOOLCHAIN_FILE ?= $(EMSDK)/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake
Dummy_DIR ?= ../../dist/lib/cmake/dummy/

BUILD_DIR ?= build
DIST_DIR ?= dist

CXX_SRC_DIR := src/c++
TS_SRC_DIR := src
WASM_DIR := $(TS_SRC_DIR)/wasm

.PHONY: all build-ts build-wasm configure-ts configure-wasm clean default

default: all

# First step
# - To find libdummy we have to provide the parent directory of its config: Dummy_DIR.
# - To tell cmake to use the emsdk we provide the emsdk toolchain file.
#   This is essentially the same what 'emcmake cmake <args>' does.
configure-wasm:
	mkdir -p $(BUILD_DIR) $(DIST_DIR)
	cmake -S . -B $(BUILD_DIR) -DDummy_DIR=$(Dummy_DIR) -DCMAKE_TOOLCHAIN_FILE=$(CMAKE_TOOLCHAIN_FILE)

# Second step
# Build the wasm file, its glue code and copy everything into the bundle:
build-wasm: #configure-wasm
	cmake --build $(BUILD_DIR) --parallel

install-wasm: build-wasm
	cmake --install $(BUILD_DIR) --prefix $(WASM_DIR)

configure-ts: install-wasm

# Third step
# typescript dependencies are handled by typescript compiler tsc:
# FIXME the copy operation for the wasm file is not very elegant.
build-ts: #configure-ts
	npx tsc
	cp src/wasm/*.wasm dist/wasm/

# FIXME we need serial execution here (so this breaks if user specifies make -j)
all: configure-wasm configure-ts build-ts

clean:
	rm -rf $(BUILD_DIR) $(DIST_DIR) $(WASM_DIR)
