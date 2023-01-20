////// loops -----> for, while
/*
for (i = 30; i >= 20; i--) {
  if (i % 23 == 0) {
    // break;
    continue;
  }
  console.log(`salam ${i}`);
}

let counter = 11;

while (counter < 10) {
  console.log("inside while");
  counter++;
}

do {
  console.log("inside while");
  counter++;
} while (counter < 10);
*/
/////// TODO: find all prime number
//// 12 not prime, 13 is prime
/*
const findAllPrime = 100;
for (let i = 2; i < findAllPrime; i++) {
  let isPrime = true;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      isPrime = false;
      break;
    }
    // if (j == i - 1) {
    //   console.log(i);
    // }
  }
  if (isPrime) {
    console.log(i);
  }
}
*/

///// 12 ----> 1100, 23 -----> 10111

const findMinTwoForPresent = 31;

/* 
let binaryCounter = 0;
let temp = findMinTwoForPresent;
while (temp > 1) {
  let i = 0;
  while (2 ** i <= temp) {
    i++;
  }
  if (i > 0) {
    binaryCounter++;
  }
  temp -= 2 ** (i - 1);
}
console.log(binaryCounter);
*/

/* 
const minNumberBit = Math.floor(Math.log2(findMinTwoForPresent));
let temp = findMinTwoForPresent;
let binaryCounter = 0;

for (let i = minNumberBit; i > 0 && temp != 0; i--) {
  if (temp >= 2 ** i) {
    temp -= 2 ** i;
    binaryCounter++;
  }
}
console.log(binaryCounter);
*/
//////// Array

const myArr = ["Ashkan", 23, true, NaN, ["A", 12], { username: "Ashkan" }];
// myArr[0] += "s";

// console.log(myArr[2]);
// console.log(myArr[5]); /// out of index nadarim
// console.log(myArr.length);
// console.log(myArr.push("Mapsa"));
// console.log(myArr.pop());
// console.log(myArr.slice(1, 4));
// console.log(myArr.splice(3, 1));
// console.log(myArr);
// console.log(typeof myArr);

//// for loop on array

// for (const item of myArr) {
//   if (Array.isArray(item)) {
//     console.log("array is available");
//     console.log(item);
//   }
// }

// for (let indx in myArr) {
//   console.log(indx);
// }


// console.log(myArr.map((val) => Array.isArray(val)));
// console.log(
//   myArr.map((val, indx, arr) => {
//     console.log("val: ", val);
//     console.log("indx: ", indx);
//     console.log("arr: ", arr);
//   })
// );

///////// functions in JS

/// regular

function regularFunc(arguments) {
  //// block function
}

/// arrow function
const myArrowFunc = (arguments) => {};

// const isPrime = (numb) => {
//   for (let i = 2; i < numb; i++) {
//     if (numb % i == 0) {
//       return false;
//     }
//   }
//   return true;
// };
// console.log(isPrime(13));
