const express = require("express");
const { adminAuth, usernAuth } = require("./middleWares/auth");

// Create a Server
const app = express();

// Server Response

app.get("/getUserData", (req, res) => {
  // try {
  console.log("come getuserSta Route");
  throw new Error("hjakakak");
  console.log("come getuserSta Route hahahahah");
  res.send("Data Is Send Successfully");
  // } catch (error) {
  //   res.status(401).send("contact the support team");
  // }
});

app.use((err, req, res, next) => {
  console.log("come / route");
  if (err) {
    res.status(401).send("contact the support team");
  }
  // next();
});

// Listen Request
app.listen(7777, () => {
  console.log("Server Is Successfully Listing On Port 7777....");
});
