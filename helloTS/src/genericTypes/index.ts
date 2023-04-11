function addGeneral<T>(x: T, y: T) {
  if (typeof x === "string" && typeof y === "string") return x + y;
  if (typeof x === "number" && typeof y === "number") return x + y;
}

// console.log(addGeneral<string>("A", "B"));
// console.log(addGeneral<number>(34, 34));

class GenericAdd<NumType> {
  add: (x: NumType, y: NumType) => NumType;
}

const addNumber = new GenericAdd<number>();
addNumber.add = function (x, y) {
  return x + y;
};

const addString = new GenericAdd<string>();
addNumber.add = function (x, y) {
  return x + y;
};

interface GenericUserInfo<T1, T2> {
  username: T1;
  address: T2;
}

const user: GenericUserInfo<string, string> = {
  username: "A",
  address: "Tehran",
};
const user2: GenericUserInfo<string, number> = {
  username: "A",
  address: 234232,
};

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const lisener = {
  error: [],
  info: [],
};

type testKeyOf = keyof { x: 2; y: 23 };

getProperty(lisener, "error");
getProperty(lisener, "debug");



type data = "a" | "b";
function x<T extends data>(args: T) {
  return args;
}


x<"b">("a");
