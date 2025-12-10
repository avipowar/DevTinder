const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

// Create a Server
const app = express();

// Convert JSON => Js Object (Middleware)
app.use(express.json());

// Make api call
app.post("/singUp", async (req, res) => {
  // create a new  instance of user MODAL
  const user = new User(req.body);
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
