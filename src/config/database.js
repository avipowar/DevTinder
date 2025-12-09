const mongoose = require("mongoose");

// connect database
const connectDB = (async = async () => {
  await mongoose.connect(
    "mongodb+srv://powaravinash06_db_user:NCnXKvocNyayiIjW@namsatedev.qnzwemy.mongodb.net/devTinder"
  );
});

// result

module.exports = connectDB;
