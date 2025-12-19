const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data Is Not Valid");
        }
      },
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email_Id" + value);
        }
      },
    },
    passWord: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid Password " + Value);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.livemint.com/lm-img/img/2024/05/03/600x338/6_1714726534356_1714726618820.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is about the new user",
    },
    skills: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "AVI@9764995656", {
    expiresIn: "2 d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
