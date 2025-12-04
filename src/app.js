const express = require("express");

// Create a Server
const app = express();

// Server Response
// app.use("/", (req, res) => {
//   res.send("Welcome To 7777 Port Server");
// });

app.use("/home", (req, res) => {
  res.send("Welcome To Home Page");
});

app.use("/About", (req, res) => {
  res.send("Welcome To About pAGE");
});

// Listen Request
app.listen(7777, () => {
  console.log("Server Is Successfully Listing On Port 7777....");
});
