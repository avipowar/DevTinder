const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleWares/auth");

// Create a Server
const app = express();

// Convert JSON => Js Object (Middleware)
app.use(express.json());
// Convert token => Js Object (Middleware)
app.use(cookieParser());

// Make api call
app.post("/singUp", async (req, res) => {
  try {
    // Validate your user

    validateSignUpData(req);

    // Encrypted your password with the hash

    const { firstName, lastName, emailId, passWord } = req.body;

    const hashPassword = await bcrypt.hash(passWord, 10);

    // create a new  instance of user MODAL
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: hashPassword,
    });

    await user.save();
    res.send("User Added into Database Successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, passWord } = req.body;

  try {
    // check emailID is Valid Or not
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Email Id Is Wrong");
    }
    // check password is valid
    const isPasswordValid = await user.validatePassword(passWord);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("User Login Successfully");
    } else {
      throw new Error("Password is Incorrect");
    }
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is Established");
    // Listen Request
    app.listen(7777, () => {
      console.log("Server Is Successfully Listing On Port 7777....");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...");
  });
