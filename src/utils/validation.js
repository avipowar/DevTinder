const validator = require("validator");

const validateSignUpData = (req) => {
  // Destructuring
  const { firstName, lastName, emailId, passWord } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name Is Not Valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Is Not Valid");
  } else if (!validator.isStrongPassword(passWord)) {
    throw new Error("Password Is Not Strong");
  }
};

module.exports = {
  validateSignUpData,
};
