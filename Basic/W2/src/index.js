// const calculator = require("./calculator"); /// commonJS
// const J2 = require("./J2");

import mult, { sum, subtract } from "./calculator";

const name = "Ashkan";

window.name = name;
console.log("salm");

// console.log(calculator.sum(2, 3));
// console.log(calculator.mult(2, 3));

// console.log(sum(12, 43));
console.log("Salam");
// console.log(subtract(12, 43));
console.log(mult(12, 43));
