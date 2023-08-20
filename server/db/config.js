const mongoose = require("mongoose");
const server = "192.168.69.123:27017";
const database = "CouponCode";
mongoose
  .connect("mongodb://127.0.0.1:27017/CouponCode")
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(`not connected`);
  });
