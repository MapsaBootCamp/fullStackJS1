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

users = ["user-10", "user-2", "user-3"];

// console.log(
//   users.filter((item) => {
//     const itemSplited = item.split("-");
//     return parseInt(itemSplited[itemSplited.length - 1]) > 2;
//   })
// );

// console.log(
//   users.find((item) => {
//     const itemSplited = item.split("-");
//     return parseInt(itemSplited[itemSplited.length - 1]) > 2;
//   })
// );

// users.forEach((val, indx) => {
//   console.log(indx, val);
// });

///////// functions in JS

/// regular

// function regularFunc(arguments) {
//// block function
// }

/// arrow function
// const myArrowFunc = (arguments) => {};

// const isPrime = (numb) => {
//   for (let i = 2; i < numb; i++) {
//     if (numb % i == 0) {
//       return false;
//     }
//   }
//   return true;
// };
// console.log(isPrime(13));

///// TODO: func(arr, num) ====> return new arr

const argArr = [3, -2, 32, 12];
const argNum = 12;

// console.log(findLowerThan(argArr, argNum));

// function findLowerThan(arr, numb) {
//   return arr.filter((val) => val < numb);
// }

// function findLowerThan(arr, numb) {
//   const result = [];
//   arr.forEach((val) => {
//     if (val < numb) result.push(val);
//   });
//   return result;
// }

// console.log(findLowerThan(argArr, argNum));

///// TODO: [2, 3, 3, 2, 1, 12] ====> [[2, 2], [3, 2], [1, 1], [12, 1]]

const findFreq = function (arr) {
  const checkedNumbers = [];
  const result = [];

  for (let elm of arr) {
    if (checkedNumbers.includes(elm)) {
      continue;
    }
    checkedNumbers.push(elm);
    let freq = 0;
    for (let item of arr.slice(arr.indexOf(elm))) {
      if (item == elm) {
        freq++;
      }
    }
    result.push([elm, freq]);
  }
  return result;
};

function findFreq2(arr) {
  const checkedNumbers = [];
  const result = [];

  for (let elm of arr) {
    if (checkedNumbers.includes(elm)) {
      continue;
    }
    checkedNumbers.push(elm);
    let freqArr = arr.slice(arr.indexOf(elm)).filter((val) => val == elm);
    result.push([elm, freqArr.length]);
  }
  return result;
}

// console.log(findFreq2([2, 3, 3, 2, 1, 12, 3]));

users[6] = "Gholi";
users["salam"] = 12;
users[-2] = 8;
users[1.2] = 12;
console.log(users);
console.log(users.length);
for (const elm of users) {
  console.log(elm);
}

console.log(users.indexOf(8));
