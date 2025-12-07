const express = require("express");

// Create a Server
const app = express();

// Server Response
app.use("/user", (req, res) => {
  res.send("Welcome To 7777 Port Server");
});

app.get("/user", (req, res) => {
  res.send({ fistName: "Avinash", lastName: "Powar" });
});

app.post("/user", async (req, res) => {
  res.send("Update The Database Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully");
});

app.use("/", (req, res) => {
  res.send("Welcome To 7777 Port Server");
});

// Listen Request
app.listen(7777, () => {
  console.log("Server Is Successfully Listing On Port 7777....");
});
