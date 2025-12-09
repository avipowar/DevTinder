const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

// Create a Server
const app = express();

// Make api call
app.post("/singUp", async (req, res) => {
  const user = new User({
    firstName: "Ashish",
    lastName: "Gaikwad",
    emailId: "ashishgaikwad@1.com",
    passWord: "Avi@123",
  });

  try {
    await user.save();
    res.send("User Added into Database Successfully");
  } catch (err) {
    res.status(400).send("error saving the user: " + err.message);
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
