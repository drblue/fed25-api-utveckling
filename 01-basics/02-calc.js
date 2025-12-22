/**
 * Calc 🧮
 */
const geometry = require("./modules/geometry");

console.log("A random number:", Math.random());

console.log("Area of 2x4 box:", geometry.areaOfSquare(2, 4));
console.log("Circumference of 2x4 box:", geometry.circumferenceOfSquare(2, 4));

console.log("Area of a circle with radius 10:", geometry.areaOfCircle(10));
console.log("Circumference of a circle with radius 10:", geometry.circumferenceOfCircle(10));
