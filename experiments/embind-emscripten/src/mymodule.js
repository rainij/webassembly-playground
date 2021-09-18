import Bindings from "./bindings.js";
console.log(Bindings);

// top-level await seems to be a new feature.
// Currently (as of august 2021) proposal in stage 4 of 5.
// https://github.com/tc39/proposal-top-level-await
const bindings = await Bindings();

console.log("Just for fun some value: ", bindings.wmean(2, 3, 0.71));

export const mypi = 3.14;
export const wmean = bindings.wmean;
export const wrapped_say_hello = bindings.wrapped_say_hello;
export const the_answer_plus = bindings.the_answer_plus;
export const MyClass = bindings.MyClass;
