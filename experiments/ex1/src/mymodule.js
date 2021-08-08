import Bindings from "./bindings.js";
const bindings = await Bindings();

console.log("Just for fun some value: ", bindings.wmean(2, 3, 0.71));

export let mypi = 3.14;
export let wmean = bindings.wmean;
export let wrapped_say_hello = bindings.wrapped_say_hello;
export let the_answer_plus = bindings.the_answer_plus;
