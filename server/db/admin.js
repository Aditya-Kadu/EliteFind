const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  companyName: String,
  companyCity: String,
  companyContactNo: String,
  companyEmailId: String,
  companyPassword: String,
});

module.exports = mongoose.model("admin", userSchema);
