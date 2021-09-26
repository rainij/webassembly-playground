.PHONY: clean default

default: dist/factorial.js dist/factorial.wasm dist/factorial_s-expressions.wasm

dist/%.wasm: src/%.wat
	wat2wasm $^ -o $@

dist/%.js: src/%.js
	cp $^ $@

clean:
	rm -f dist/*
