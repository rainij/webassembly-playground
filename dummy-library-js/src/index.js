import DummyJS from './dummy-js.js';
import DummyJSModule from './dummy-js.wasm';

console.log('[GLUE]: The URL of the wasm module of dummy-js:', DummyJSModule);

// The "trick" with locatFile is from: https://gist.github.com/surma/b2705b6cca29357ebea1c9e6e15684cc
// Since webpack will change the name and potentially the path of the
// `.wasm` file, we have to provide a `locateFile()` hook to redirect
// to the appropriate URL.
// More details: https://kripken.github.io/emscripten-site/docs/api_reference/module.html
const promise = DummyJS({
  // Here we provide the Module initializer function with an initial value for the *Module* object
  // See the line containing "Module = Module || {};" in the js glue code.
  // For documentation on locateFile see:
  // https://emscripten.org/docs/api_reference/module.html?highlight=locatefile#Module.locateFile
  locateFile(path) {
    // TODO this solution only works because we only have *one* wasm file (dummy-js.wasm) which possibly gets renamed by a bundler like webpack.
    console.log(`[GLUE]: call locatePath('${path}')`); // dummy-js.wasm
    if(path.endsWith('.wasm')) {
      return DummyJSModule;
    }
    return path;
  }
});

const module = await promise;

export const mypi = 3.14;
export const wmean = module.wmean;
export const theAnswerPlus = module.theAnswerPlus;
export const sayHello = module.sayHello;
export const prependHello = module.prependHello;
export const MyClass = module.MyClass;
