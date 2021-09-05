import { mypi, wmean, theAnswerPlus, sayHello, prependHello, MyClass } from 'dummy-js';

console.log('mypi = ', mypi);
console.log('mean of 1 and 2 with weight 0.82 is', wmean(1, 2, 0.82));
console.log('the answer plus 9 is', theAnswerPlus(9));
sayHello()
console.log(`prependHello(\'dear programmer!\'): '${prependHello('dear programmer!')}'`)

// TODO is this really not allowed: const myclass0 = new MyClass(); ?
const myclass1 = new MyClass(5);
try {
    console.log('myclass:', myclass1);
    myclass1.attachment = `The fine-structure constant is roughly ${1/137}.`;
    console.log('myclass.attachment =', myclass1.attachment);
    console.log('myclass.x = ', myclass1.x);
    myclass1.incrementX();
    console.log('myclass.x (incremented) = ', myclass1.x);
    myclass1.x = -123;
    console.log('myclass.x (reseted) = ', myclass1.x);
    console.log('MyClass.getCppClassName() ->', MyClass.getClassName());
} finally {
    // C++ class resources are not garbage collected !!!
    myclass1.delete()
}



