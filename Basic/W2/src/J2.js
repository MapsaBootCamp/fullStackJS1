///// this

function logThis(args) {
  console.log("Args: ", args);
  console.log(this);
}

var camp = "Mapsa";

function changeCamp(params) {
  var camp = "Ashkan";
}

// console.log(camp);
// changeCamp();
// console.log(camp);

const a = {
  name: "Ashkan",
  myArrow: () => console.log(this),
  myFun: function () {
    console.log("log this in a object: ", this);
    this.logThis();
  },
};

a.logThis = logThis;
// a.myFun();
// a.myArrow();
// logThis.call(a, 1);
// a.logThis(3);

const myArr = [2, 3, "Ashkan", null];
const myObj = {
  // name: "Ashkan",
  age: 22,
  address: "Tehran",
};
const [mohsen, , , var2 = "AAAA", ...restArr] = myArr; /// array destructuring
// console.log(var2);

const { name: MyName = "Gholam", ...restObj } = myObj; /// object destructuring
// console.log(MyName);

function connectDB({
  dbServer: server = "localhost",
  dbPort: port = "5432",
  dbName,
  query,
}) {
  console.log("server", server);
  console.log("port", port);
  console.log("dbName", dbName);
  console.log("query", query);
}

// connectDB({
//   dbServer: "123.212.211.33",
//   query: "SELECT *",
//   dbName: "camp",
// });

/////// map, reduce, ...

// console.log(myArr.map((val) => `salam ${val}`));

const myMapFn = function (callFn) {
  return this.reduce((prevVal, currVal) => {
    // prevVal.push(callFn(currVal));
    // return prevVal;
    return [...prevVal, callFn(currVal)];
  }, []);
};

Array.prototype.myMapFn = myMapFn; //// kesafat

// console.log(myMapFn(myArr, (val) => `salam ${val}`));
// console.log(myArr.map((val) => `salam ${val}`));

// filter, some, every

userAges = [32, 43, 21, 16, 21, 26];

const condition = (val) => {
  if (val) {
    return "Truthy";
  } else {
    return "Falsy";
  }
};

// console.log(condition(false));

console.log(userAges.filter((val) => val > 24));

const myFilter = (arr, callBackFn) => {
  return arr.reduce((prevVal, currVal) => {
    return callBackFn(currVal) ? [...prevVal, currVal] : prevVal;
  }, []);
};

const mySome = (arr, callBackFn) => {
  return arr.reduce((prevVal, currVal) => {
    return prevVal || callBackFn(currVal);
  }, false);
};

const myEvery = (arr, callBackFn) => {
  return arr.reduce((prevVal, currVal) => {
    return prevVal && callBackFn(currVal);
  }, true);
};
// console.log(myFilter(userAges, (val) => val > 24));
console.log(mySome(userAges, (val) => val > 45));
console.log(myEvery(userAges, (val) => val > 12));
// console.log(userAges.every((val) => val > 15));

///// higher order function =====> closure

function sumWithNum(numb) {
  const name = "Ashkan";
  return function (arg) {
    console.log(name);
    return arg + numb;
  };
}

const sumWithOne = sumWithNum(1);
const sumWithTwo = sumWithNum(2);

console.log(sumWithOne(3));
console.log(sumWithOne(12));
console.log(sumWithTwo(12));

//// inheritance

class A {
  title = "Mapsa NodeJS Camp";
  logTitle() {
    console.log("in A", this.title);
  }
}

class B extends A {
  logTitle() {
    console.log(this.title);
  }
}

const bObj = new B();
bObj.logTitle();
