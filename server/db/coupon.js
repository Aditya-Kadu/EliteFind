const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  couponCodeName: String,
  couponCodeDiscount: String,
  couponCodeExpire: Date,
  couponCodeCompanyId: String,
  couponAvailIf: String,
});

module.exports = mongoose.model("coupon", userSchema);
