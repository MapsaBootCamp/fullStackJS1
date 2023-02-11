//////// ASYNCHRONOUS

////// callback

// setTimeout(() => console.log("timeout 1"), 5000);
// setTimeout(() => console.log("timeout 3"), 0);
// setTimeout(() => console.log("timeout 4"), 0);
// setTimeout(() => console.log("timeout 5"), 0);
// setTimeout(() => console.log("timeout 6"), 7000);

// console.log("Salam1");
// console.log("Salam2");
// console.log("Salam3");
// console.log("Salam4");

///// Promise

function setTimeOutPromisified(callback, delay) {
  return new Promise((resolve, reject) => {
    if (delay > 5000) {
      //   return reject(`${delay} bishtar az 5000ms!`);
      throw new Error(`${delay} bishtar az 5000ms!`);
    }
    setTimeout(() => resolve(callback()), delay);
  });
}

function sayHello(user) {
  return `Salam ${user}`;
}

const delay = 5000;
// console.log(typeof prom);
// setTimeOutPromisified(() => sayHello("Ashkan"), delay).then((msg) =>
//   console.log(msg)
// );

// fetch("https://api.github.com/users/teghfo/repos")
//   .then((resp) => resp.json())
//   .then((data) => data.map((val) => val.id))
//   .then((mapedData) => console.log(mapedData.length))
//   .catch((err) => console.log(err));

// console.log("Salam");
// setTimeout(() => console.log("Salam from immediately setTimeOut"), 0);
// Promise.resolve().then(() => console.log("Salam from Promise"));
// console.log("Bye");

/// shukhi baraye shirini (Rasoul)

// const button = document.getElementById("button");
// button.addEventListener("click", () => {
//   Promise.resolve().then(() => console.log("salam az promise 1"));
//   console.log("Salam");
// });

// button.addEventListener("click", () => {
//   Promise.resolve().then(() => console.log("salam az promise 2"));
//   console.log("Hi");
// });

// button.click()
// console.log("Hey");

// Promise.reject().catch(() => {
//   throw new Error("Hey");
// });
// console.log("Salam");

///// async/await

async function getData() {
  try {
    const res = await fetch("https://api.github.com/users/teghfo/repos");
    console.log("Mohsen");
    if (res.status === 404) {
      throw new Error("Not Found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// getData()
//   .then((val) => console.log(val))
//   .catch((err) => console.log(err));

//// regex

///// 1, 1, 2, 3, 5, .... =>   fibo(20) = fibo(19) + fibo(18)

// function testStackSize(n) {
//   console.log(n);
//   return testStackSize(++n);
// }

// testStackSize(0);

function fibo(n) {
  if (n < 2) return 1;
  return fibo(n - 1) + fibo(n - 2);
}

const now = new Date();

const emailPattern = /([\w]+\.?[\w]+)@([\w]+)\.([a-zA-Z]{2,5})/;

// fibo(40);
const testEmail = "Ashkan@test.com";

const matched = testEmail.match(emailPattern);
// console.log(matched);

console.log(new Date() - now);

const name = "Farshad";

const myObj = {
  [name]: "Alireza",
};

console.log(JSON.stringify(myObj));
console.log(JSON.parse('{"name": "Alireza"}'));

const findParanthesesData = /\(([^\)]+)\)/gi;

const testText =
  "salam be shoma dustan(merc ke). bayad did che mishe(chi migi shoma!). ba in kar chi shod ke in shod lejgejgeo(ojeojgeoj@@2424,,,.)lejgejgejge";
console.log(testText.match(findParanthesesData));
