const express = require("express");

// Create a Server
const app = express();

// Server Response
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling The Route User 1");
    next();
    // res.send("This Is The First Route Handler");
  },
  (req, res, next) => {
    console.log("Handling The Route User 2");
    // res.send("This Is The 2nd Route Handler");
    next();
  },
  (req, res, next) => {
    console.log("Handling The Route User 3");
    // res.send("This Is The 3rd Handler");
    next();
  },
  (req, res, next) => {
    console.log("Handling The Route User 4");
    // res.send("This Is The 4th Handler");
    next();
  }
);

// Listen Request
app.listen(7777, () => {
  console.log("Server Is Successfully Listing On Port 7777....");
});
