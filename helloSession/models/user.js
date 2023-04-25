const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const addressSchema = new mongoose.Schema({
  label: String,
  city: { type: String, required: true },
  street: String,
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      first: String,
      last: String,
    },
    email: {
      type: String,
      required: true,
      match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
      unique: true,
    },
    active: { type: Boolean, defualt: false },
    addresses: [addressSchema],
    profilePic: Buffer,
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  console.log(this);
  next();
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
