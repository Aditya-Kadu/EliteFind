const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productPrice: String,
  productImage: String,
  productCompanyId: String,
  productInCart: Boolean,
});

module.exports = mongoose.model("products", userSchema);
