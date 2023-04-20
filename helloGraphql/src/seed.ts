import mongoose from "mongoose";

import User from "./models/user";

mongoose.connect("mongodb://localhost:27017/libraryProject");
const db = mongoose.connection;

const users = [
  {
    name: {
      first: "Ashkan",
      last: "D",
    },
    email: "ashkan@gmail.com",
    password: 1234,
    addresses: [
      {
        label: "HOME",
        city: "Tehran",
      },
      {
        label: "WORK",
        city: "Karaj",
      },
    ],
  },
  {
    name: {
      first: "Maryam2",
      last: "Hosseini",
    },
    email: "maryam2@gmail.com",
    password: 4321,
    addresses: [
      {
        label: "HOME",
        city: "Shiraaz",
      },
      {
        label: "WORK",
        city: "Tehran",
      },
    ],
  },
];

for (const user of users) {
  const { password, ...userWitoutPass } = user;
  console.log(userWitoutPass);
  User.register(new User(userWitoutPass), `${password}`, function (error) {
    if (error) console.log(error);
    console.log(`seed user ${this.email}`);
  });
}
