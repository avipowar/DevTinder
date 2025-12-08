const express = require("express");
const { adminAuth, usernAuth } = require("./middleWares/auth");

// Create a Server
const app = express();

// Before You send The Data To ThE User First Is Authorized
app.use("/admin", adminAuth);

// Server Response
app.get("/admin/getAllData", (req, res) => {
  res.send("Data Is Send Successfully");
});

app.get("/user", usernAuth, (req, res) => {
  res.send("send all the data of user");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Delete User Successfully");
});

// Listen Request
app.listen(7777, () => {
  console.log("Server Is Successfully Listing On Port 7777....");
});
