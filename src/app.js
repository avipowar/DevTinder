const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");

// Create a Server
const app = express();

// Convert JSON => Js Object (Middleware)
app.use(express.json());

// Make api call
app.post("/singUp", async (req, res) => {
  try {
    // Validate your user

    validateSignUpData(req);

    // Encrypted your password with the hash

    // create a new  instance of user MODAL
    const user = new User(req.body);

    await user.save();
    res.send("User Added into Database Successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmailId });
    if (!user) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

// delete user api call
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const userDelete = await User.findByIdAndDelete(userId);
    if (!userDelete) {
      res.status(404).send("User Is Not Found");
    }
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(404).send("Something Went Wrong");
  }
});

// Update the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const allowUpdateTheUser = ["skills", "gender", "about", "photoUrl", "age"];

    const isAllowUpdateTheUser = Object.keys(data).every((k) =>
      allowUpdateTheUser.includes(k)
    );

    // console.log(isAllowUpdateTheUser);

    if (!isAllowUpdateTheUser) {
      // console.log("i am printing");
      return res.status(400).send("Update is not allowed");
    }

    if (data.skills.length > 10) {
      return res.status(400).send("skill not be more tha  10");
    }

    await User.findByIdAndUpdate(userId, data);
    res.send("Update the User Successfully");
  } catch (error) {
    res.send("User Not Updated");
  }
});

// Update the user with EMAIL ID
// app.patch("/updateeithemailid", async (req, res) => {
//   const emailId = req.body.emailId;
//   const data = req.body;

//   try {
//     await User.findOneAndUpdate({ emailId }, data);
//     res.send("User Update Successfully");
//   } catch (error) {
//     res.send("User Is NoT Update");
//   }
// });

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
