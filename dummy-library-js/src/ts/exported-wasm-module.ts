// Import the glue code:
import DummyJs from '../wasm/dummy-wrapper.js';
// IMPORTANT: this only works if consumer really sets up its bundler to return the url
// of the imported wasm-module.
import DummyJsUrl from '../wasm/dummy-wrapper.wasm';

console.log('[GLUE]: The URL of the wasm module of libdummy-js:', DummyJsUrl);

// Unfortunately we have to *repeat* the type information here.
// In principle the type information should be generateble by embind.
export interface DummyWasmModule extends EmscriptenModule {
  wmean: (a: number, b: number, t: number) => number,
  theAnswerPlus: (summand: number) => number,
  sayHello: () => void,
  prependHello: (text: string) => string,
  // Note: getClassName is a static method of MyClass, which is modelled by the following:
  MyClass: { new(x: number): MyClass, getClassName(): string },
}

// FIXME very annoying to *repeat* the whole class interface here:
export interface MyClass {
  set x(newX: number);
  get x(): number;
  attachment: string;
  incrementX(): void;
  // This function is added automatically by emscripten:
  delete(): void;
}


// The "trick" with locateFile is from: https://gist.github.com/surma/b2705b6cca29357ebea1c9e6e15684cc
// Since webpack will change the name and potentially the path of the
// `.wasm` file, we have to provide a `locateFile()` hook to redirect
// to the appropriate URL.
// More details: https://kripken.github.io/emscripten-site/docs/api_reference/module.html
// For documentation on locateFile see:
// https://emscripten.org/docs/api_reference/module.html?highlight=locatefile#Module.locateFile
const promise: Promise<DummyWasmModule> = DummyJs({
  locateFile(path) {
    console.log(`[GLUE]: call locatePath('${path}')`);
    if(path.endsWith('.wasm')) {
      return DummyJsUrl;
    }
    return path;
  }
});

// @ts-ignore since top-level await is the only non-es6 feature we want to support:
const module: DummyWasmModule = await promise;

export default module;
