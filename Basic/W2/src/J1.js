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

const newObj = new Object();
newObj["name"] = "A";

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

// for (let [key, val] of Object.entries(user)) {
//   console.log("key: ", key);
//   console.log("val: ", val);
// }

const newUser = new CreateUser("Ashkan", "1234", "Ashkan", "Divband", 25);

// console.log(newUser.getFullName());

/////////////////////// Class in javascript
class Graph {
  constructor(directed = false) {
    this.adjMatrix = {};
    this.directed = directed;
  }

  #addNode(nodeName) {
    if (!this.adjMatrix.hasOwnProperty(nodeName)) {
      this.adjMatrix[nodeName] = [];
    }
  }
  addNode(nodeNames) {
    if (Array.isArray(nodeNames)) {
      nodeNames.forEach((nodeName) => this.#addNode(nodeName));
    } else {
      this.#addNode(nodeNames);
    }
  }
  addEdge(node1, node2) {
    if (!(node1 in this.adjMatrix && node2 in this.adjMatrix)) {
      throw new Error(`${node1} or ${node2} is not in Graph`);
    } else {
      this.adjMatrix[node1].push(node2);
      if (!this.directed) {
        this.adjMatrix[node2].push(node1);
      }
    }
  }
  // TODO
  isConnected() {}

  // TODO
  findPath(node1, node2) {}

  // TODO
  findShortestPath(node1, node2) {}

  // TODO
  getNodeDegree(node) {}

  // TODO
  haveCycle() {}

  // TODO
  isTree() {}

  draw() {
    console.log(this.adjMatrix);
  }
}

const g1 = new Graph();
g1.addNode("a");
g1.addNode(["a", "b", 23]);
g1.addEdge("b", "a");
g1.addEdge("b", 23);
// g1.draw();
// const g2 = new Graph((directed = true));

var j1Name = "SSSS";
