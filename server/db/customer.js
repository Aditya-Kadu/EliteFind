const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  customerFirstName: String,
  customerLastName: String,
  customerEmailId: String,
  customerContactNo: String,
  customerPassword: String,
});

module.exports = mongoose.model("customer", userSchema);
