module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// const multiplierByN = (n) => {
//   const h = "Salam";

//   return (a) => {
//     console.log(`${h} - ${n}`);
//     return a * n;
//   };
// };

// const multiplierBy10 = multiplierByN(10);
// const multiplierBy12 = multiplierByN(12);

// console.log(multiplierBy10(23));
// console.log(multiplierBy10(12));
// console.log(multiplierBy12(12));
