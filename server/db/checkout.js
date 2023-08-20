const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  checkoutFirstName: String,
  checkoutLastName: String,
  checkoutAddress: String,
  checkoutCity: String,
  checkoutState: String,
  checkoutZip: String,
  checkoutCountry: String,
  checkoutCardName: String,
  checkoutCardNumber: String,
  checkoutCardExpiration: String,
  checkoutCardCVV: String,
  checkoutAmount: String,
  checkoutCustomerId: String,
  checkoutEmail: String,
});

module.exports = mongoose.model("checkout", userSchema);
