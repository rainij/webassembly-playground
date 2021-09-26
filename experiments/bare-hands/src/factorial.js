const fs = require('fs');

// read the wasm code
const bytes = fs.readFileSync(__dirname + '/factorial.wasm');

// n should be integer >= 1
const n = parseInt(process.argv[2] || 1);

// provide logging functionality to wasm module
const importObject = {
  env: {
    log: (i, fact) => console.log(`${i}! = ${fact}`),
  }
}

// create wasm module instance
// - compile wasm to a module (native code)
// - instantiate that module (provide with state)
WebAssembly.instantiate(bytes, importObject)
  .then((obj) => {
    // n should not be larger than 12, otherwise i32 overflow.
    obj.instance.exports.factorial_logger(n);
  })
  .catch((e) => {
    console.log(e);
  });
