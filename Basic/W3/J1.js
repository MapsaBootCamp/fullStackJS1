/////////////////////////////////////////////// static methids /////////////////////

class A {
  constructor(name) {
    this.name = name;
  }

  static summ(name) {
    return new A(name);
  }

  getName() {
    return this.name;
  }
}

const { getEnabledCategories } = require("trace_events");
// const aObj = new A("Ashkan");
// console.log(aObj.getName());
// console.log(A.summ("Asghar"));

//////////////////////////////////////////// more example for map, reduce, ... ////////////////////////
const data = require("./data/familiesData.json");

const getById = (id) => {
  const foundedUser = data.filter((val) => val.id === id);
  if (foundedUser.length > 0) return foundedUser[0];
  return null;
};

// console.log(Array(3));

const dataById = data.reduce(
  (prevVal, currVal) => [...prevVal, currVal],
  [undefined]
);

// console.log(dataById[5]);

const mapedData = (() => {
  const result = new Map();
  for (const [indx, val] of data.entries()) {
    result.set(indx + 1, val);
  }
  return result;
})();

const getParentById = (id) => data.filter((val) => val.children.includes(id));

// console.log(mapedData.get(25));

const siblings = (id) => {
  return getParentById(id)
    .reduce((prevVal, currVal) => [...prevVal, ...currVal.children], [])
    .filter((val) => val !== id)
    .reduce(
      (prevVal, currVal) =>
        prevVal.includes(currVal) ? prevVal : [...prevVal, currVal],
      []
    );
};

// console.log(siblings(1));
//////////////////////////////////////////// recursive ///////////////////////////////

function fibo(n, cacheFiboArr = [1, 1]) {
  /* 
        @params: type(n) ==> integer n >= 1

    */
  //// stop condition
  if (cacheFiboArr.length > n - 1) return cacheFiboArr[n - 1];
  cacheFiboArr.push(fibo(n - 1, cacheFiboArr) + fibo(n - 2, cacheFiboArr));
  return cacheFiboArr[n - 1];
}

// console.log(fibo(9));

////////////////////////////////////////// data structures  Array ----> Map, Set, [TypedArray] //////////////////////////////////

const idToUser = new Map([[12, { username: "Gholam", age: 21 }]]);
idToUser.set(1, { username: "Ashkan", age: 21 });
idToUser.set(2, "Asghar");
idToUser.set(3, "Zari");
idToUser.set(4, "Essi");

// console.log("Typof Map: ", typeof idToUser);
// console.log("instaceOf Map: ", idToUser instanceof Array);

// console.log(idToUser.get(1));

// for (const [key, val] of idToUser) {
//   console.log("key", key);
//   console.log("val", val);
// }
// console.log(idToUser.size);
// console.log(idToUser.has(14));

// console.log([...idToUser.keys()]);
// console.log([...idToUser.values()]);
// console.log([...idToUser.entries()]);

// console.log([...idToUser]);

const myObj = { name: "Ashkan" };

const mySet = new Set([1, 2, 2, 3, 4, 3, 2, myObj, 3, 4, { name: "Ashkan" }]);

// for (const val of mySet) {
//   console.log("val", val);
// }

// console.log(mySet.has(myObj));

//////// indx, val of Array
// for (let [indx, val] of ["A", "B"].entries()) {
//   console.log(indx, val);
// }

// console.log(mySet.size);

////////////////////////////////////////////// iterable objects ///////////////////////////////////////
//////////////////////////////// Symbol////////////////////

const mySym1 = Symbol("Ashkan");
const mySym2 = Symbol("Ashkan");

const newObj = {
  [mySym1]: "Harchi",
  [mySym2]: "Mohsen",
};

// console.log(newObj[mySym2]);

//// built-in iterable objects JS ====> Array, Map, Set, TypedArray, ....

const iterable = [1, 2, 3, -4, 12];
const iterator = iterable[Symbol.iterator]();
const iterationResult = iterator.next();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  [Symbol.iterator]() {
    let next = this.from;
    let to = this.to;
    return {
      next() {
        if (next < to) {
          return {
            value: next++,
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

const range = new Range(2, 5);
const rangeIterator = range[Symbol.iterator]();
// console.log(rangeIterator.next());
// console.log(rangeIterator.next());
// console.log(rangeIterator.next());
// console.log(rangeIterator.next());
// console.log([...rangeIterator]);

// for (const iterator of range) {
//   console.log(iterator);
// }
// console.log([...range]);

////////////////// Generator

function* rangeWithGenerator(from, to) {
  for (let i = from; i < to; i++) {
    yield i;
  }
}

// for (const iterator of rangeWithGenerator(2, 12)) {
//   console.log(iterator);
// }

class Range2 {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  *[Symbol.iterator]() {
    for (let i = this.from; i < this.to; i++) {
      yield i;
    }
  }
}

const range2 = new Range2(2, 5);
console.log([...range2]);
// console.log([...myGenerator()]);

////////////////////////////////////////////// asynchronous -----> callback, promise, async/await //////////////////////
