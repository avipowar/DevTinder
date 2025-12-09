const adminAuth = (req, res, next) => {
  console.log("admin authorized checking here....");
  // Authentication Logic
  const token = "xyz";
  const userAuthorized = token === "xyz";

  if (!userAuthorized) {
    res.status(401).send("UnAuthoRized User");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("admin authorized checking here....");
  // Authentication Logic
  const token = "xyz";
  const userAuthorized = token === "xyz";

  if (!userAuthorized) {
    res.status(401).send("UnAuthoRized User");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
