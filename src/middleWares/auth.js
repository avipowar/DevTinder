const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decodedObj = await jwt.verify(token, "AVI@9764995656");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
