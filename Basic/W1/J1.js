// console.log("salam Donya!!");
/*
    Full Stack Dev ---- Autumn 2023
    
*/

//// data types: primitive & object

//// primitive: 1.Number 2.String 3.Boolean 4.null 5.undefined 6.symbol 7.BigInt

///////////////////////////// Number

// console.log(Number.MAX_SAFE_INTEGER); /// 64bit
console.log(Number.MAX_VALUE);
let a = 0x11; /// base-16
// console.log(typeof a);
let b = 0o21;
// console.log(b);
// console.log(1e12);
// console.log(12.234);
// console.log(1_000_000);
let shartMohsen1 = 0.4 - 0.3;
let shartMohsen2 = 0.2 - 0.1;
// console.log(shartMohsen1.toFixed(2));
// console.log(Math.sin(Math.PI / 6));
// console.log(1 / 0);
const myBigInt = "1" + "0".repeat(300);
// console.log(1e700);
// console.log(12n ** 2n);
// console.log(12n / 5n);

///////////////////// String

const userName = "Ashkan-Ali-GholamQW"; //// new String()
// console.log(typeof userName);
// console.log(userName.substring(1, 3));
// console.log(userName.split("-"));
// console.log(userName.length);
// console.log(userName[userName.length - 1]); //// same: console.log(userName.slice(-1));
//
//
// console.log("Ashkan" + " Divband");
// console.log("Ashkan\nDivband");

////////////////////////// Boolean ====> true, false

// console.log(typeof true);
// console.log(1 == "1");
// console.log(1 === "1");
// console.log([] == "");
const c1 = false;
const c2 = false;
const c3 = true;

if (c1 || c2) {
  console.log("Salam");
} else if (c3) {
  temp = "Temp";
  console.log("Bye!");
} else {
  console.log("Bye final!");
}

const myNumber = 18;

/// Even or Odd
if (myNumber % 2 == 0) {
  console.log(`${myNumber} is Even`);
} else {
  console.log(`${myNumber} is Odd`);
}

////Bug
console.log(typeof null);
