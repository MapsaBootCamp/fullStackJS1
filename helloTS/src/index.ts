import { a, calculator } from "./calculator";

let active: boolean;
let userNames: string[] = ["Ashkan"];
let user = {
  username: "A",
  age: 43,
  active: true,
  address: "eopgjepioghe",
  phone: "2324242",
};

type User = {
  username: string;
  age: number;
  active: boolean;
  address?: string;
};

function authorizeUser(user: User) {
  return user.active;
}

function add(x: string | number, y: string | number) {
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  }
}

add(23, 32);

authorizeUser(user);
type manDarAvordi = [number, string, boolean, any?];
let userAges: manDarAvordi = [43, "A", true, 43];

const myAnn = (ages: number[]): boolean[] => {
  return [true];
};

function arrElementtoCapital(inp: string[]): string[] {
  return inp.map((val) => val.toUpperCase());
}

const data = arrElementtoCapital(userNames);

interface IUser {
  username: string;
  age: number;
}

// interface IUser {
//   x: number;
// }

interface IAdminUser extends IUser {
  role: "Admin" | "User";
}

const myUser: IAdminUser = { username: "Ashkan", age: 23, role: "Admin" };

enum Role {
  User,
  Staff,
  Superuser,
}

enum WeekDay {
  Sat,
  Sun,
}

console.log(WeekDay.Sat < WeekDay.Sun);

console.log(Role.Superuser);

Promise.resolve().then(() => console.log("OKKKK promise"));

async function A() {}

///// access modifier ====> private, public, protected

class Camp {
  readonly name: string = "NodeJS";

  constructor(x: string, y?: number) {
    console.log("in Camp");
  }

  //     if (otherName !== undefined) {
  //       this.name = otherName;
  //     }
  //   }
}

class B extends Camp {
  constructor(x: string, y?: number, extra?: any) {
    super(x, y);
  }
}

const campObj = new B("A", 23);
console.log(campObj.name);

// campObj.name = "A";

////// TODO: moghe designPattern darkesh konim
// interface IUserFullName extends IUser {
//   fullname(): number;
// }
// class A implements IUserFullName {
//   username: string;
//   age: number;
//   constructor(username: string, age: number) {
//     this.username = username;
//     this.age = age;
//   }

//   fullname(): number {
//     return 23;
//   }
// }

// class B extends A {}

// class C extends B {}

console.log(a);

console.log(calculator.summ(12, 32));
