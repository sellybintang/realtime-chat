const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB } = process.env;

const database = (module.exports = () => {
  try {
    mongoose.connect(MONGODB);
    console.log("Connected to Mongodb");
  } catch (err) {
    console.log("failed");
  }
});

module.exports = database;
