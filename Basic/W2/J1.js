////// cont. Arrays

const ages = ["23", "32", "41", "4"];

const agesNumber = ages.map((val) => Number(val));

const mojazha = agesNumber.filter((val) => val > 25);

//////////////////////deepCopy
///// const a = ages.map((val) => val); deepCopy
///// const a = [...ages];
// a.push("65");

const meanAges = agesNumber.reduce((prevVal, curVal, curIndex) => {
  //   return prevVal + curVal / arr.length;
  return (prevVal * curIndex + curVal) / (curIndex + 1);
}, 0);

// console.log(meanAges);

////////////// Object ===> property, methodes

const user = {
  username: "Ashkan",
  firstName: "Ashkan",
  lastName: "Divband",
  password: "1234",
  age: 20,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

// console.log(user);
// user.active = true;
user["active"] = true;
// console.log(user);

// function CreateUser(username, password, firstName, lastName, age) {
//   //   console.log("vorud: ", this);
//   this.username = username;
//   this.password = password;
//   this.age = age;
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.getFullName = function () {
//     return this.firstName + " " + this.lastName;
//   };
// }

class CreateUser {
  constructor(username, password, firstName, lastName, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

const newUser = new CreateUser("Ashkan", "1234", "Ashkan", "Divband", 25);

// console.log(newUser.getFullName());

class Graph {
  constructor(directed = false) {
    this.adjMatrix = {};
  }

  _addNode(nodeName) {
    if (!this.adjMatrix.hasOwnProperty(nodeName)) {
      this.adjMatrix[nodeName] = [];
    }
  }
  addNode(nodeNames) {
    if (Array.isArray(nodeNames)) {
      nodeNames.forEach((nodeName) => this._addNode(nodeName));
    } else {
      this._addNode(nodeNames);
    }
  }
  draw() {
    console.log(this.adjMatrix);
  }
}

const g1 = new Graph();
g1.addNode("a");
g1.addNode(["a", "b", 23]);
g1.draw();
