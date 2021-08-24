// Note: top-level await !!
const wasm = await WebAssembly.instantiateStreaming(fetch('bindings.wasm'), {
    env: {
        printInt: (arg) => console.log(arg), // suffices for printing integers
        printByteString: printByteString, // printing strings is non-trivial (currently)
    }
});

console.log('wasm = ', wasm);

function printByteString(ptr, length) {
    // Note: we need module-level variable 'wasm' here.
    // Hence we hand over a *proper* closure to the WASM Code!
    const buffer = wasm.instance.exports.memory.buffer;
    const view = new Uint8Array(buffer, ptr);

    let string = '';
    for (let i = 0; i < length; ++i) {
        string += String.fromCharCode(view[i]);
    }

    console.log(string);
}

// if we wouldn't use extern "C" the C++-functions would be mangled like that.
// console.log(wasm.instance.exports._Z5wmeanfff(1,2,0.4));
// The exact name of the mangled function is an implementation detail of the compiler.

export let mypi = 3.14;
export let wmean = wasm.instance.exports.wmean;
export let sayHello = wasm.instance.exports.say_hello; // convert C++-naming convention to js-naming convention
