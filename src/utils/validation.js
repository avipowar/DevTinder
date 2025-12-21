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

const validateProfileData = (req) => {
  const allowToEdit = [
    "fistName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
    "age",
  ];

  const isAllowed = Object.keys(req.body).every((key) =>
    allowToEdit.includes(key)
  );

  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileData,
};
