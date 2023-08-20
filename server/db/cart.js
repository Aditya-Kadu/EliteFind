const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cartProductName: String,
  cartProductPrice: String,
  cartProductImage: String,
  cartProductId: String,
  cartProductCompanyId: String,
  // cartProductInCart: Boolean,
  cartProductCustomerId: String,
});

module.exports = mongoose.model("cart", userSchema);
