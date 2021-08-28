if (typeof(Module) === "undefined") Module = {};

// Custom logging code: stdout from our module is routed to the console.
// We added a prefix '[WASM]' to distinguish it from other log messages.
Module['print'] = function(message) { console.log('[WASM]: ' + message) };