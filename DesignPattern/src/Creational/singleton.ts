class MySinglton {
  private static instance: MySinglton;
  private constructor() {}

  static getInstance() {
    if (!MySinglton.instance) {
      MySinglton.instance = new MySinglton();
    }
    return MySinglton.instance;
  }

  writeToDB() {
    console.log("write to DB");
  }
}

const obj1 = MySinglton.getInstance();
const obj2 = MySinglton.getInstance();

if (obj1 === obj2) {
  console.log("ok!");
}

obj1.writeToDB();
