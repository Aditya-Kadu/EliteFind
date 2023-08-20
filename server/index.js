const express = require("express");
const cors = require("cors");
require("./db/config");
const Admin = require("./db/admin");
const Customer = require("./db/customer");
const Product = require("./db/products");
const Coupon = require("./db/coupon");
const Cart = require("./db/cart");
const Checkout = require("./db/checkout");
const schedule = require("node-schedule");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup-admin", async (req, res) => {
  let admin = Admin(req.body);
  let result = await admin.save();
  result = result.toObject();
  res.send(result);
});

app.post("/signup-customer", async (req, res) => {
  let customer = Customer(req.body);
  let result = await customer.save();
  result = result.toObject();
  res.send(result);
});

app.post("/login-admin", async (req, resp) => {
  if (req.body.companyEmailId && req.body.companyPassword) {
    let admin = await Admin.findOne(req.body).select("-companyPassword");
    if (admin) {
      resp.send(admin);
    } else {
      resp.send({ result: "User not found" });
    }
  } else {
    resp.send({ result: "Enter all fields" });
  }
});

app.post("/login-customer", async (req, resp) => {
  if (req.body.customerEmailId && req.body.customerPassword) {
    let customer = await Customer.findOne(req.body).select("-customerPassword");
    if (customer) {
      resp.send(customer);
    } else {
      resp.send({ result: "User not found" });
    }
  } else {
    resp.send({ result: "Enter all fields" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = Product(req.body);
  let result = await product.save();
  result = result.toObject();
  res.send(result);
});

app.post("/add-coupon", async (req, res) => {
  let coupon = Coupon(req.body);
  let result = await coupon.save();
  result = result.toObject();
  res.send(result);
});

app.get("/get-products", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});

app.get("/get-coupons", async (req, res) => {
  let coupons = await Coupon.find();
  res.send(coupons);
});

// /delete-coupon/64e062098468761443204b28

app.delete("/delete-product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(req.params);
});

// app.post("/delete-coupon/:id", async (req, res) => {
//   let result = await Coupon.deleteOne({ _id: req.params.id });
//   res.send(req.params);
// });

app.delete("/delete-coupon/:id", async (req, resp) => {
  let result = await Coupon.deleteOne({ _id: req.params.id });
  resp.send(req.params);
});

app.get("/get-product/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send({ result: "Product not found" });
  }
});

app.get("/get-coupon/:id", async (req, res) => {
  let coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    res.send(coupon);
  } else {
    res.send({ result: "Coupon not found" });
  }
});

app.put("/update-coupon/:id", async (req, res) => {
  let result = await Coupon.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// Error
// app.put("/add-to-cart/:id", async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);
//     let cartproduct = await Cart.create(product);
//     let result = await Cart.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           productInCart: true,
//           // productCustomerId: req.body.productCustomerId,
//         },
//       }
//     );
//     res.send("Data duplicated successfully:", duplicatedData);
//   } catch (error) {
//     res.send("Error duplicating data:", error);
//   }

//   res.send(result);
// });

app.post("/add-to-cart", async (req, res) => {
  let cart = Cart(req.body);
  let result = await cart.save();
  result = result.toObject();
  res.send(result);
});

app.get("/get-cart/:id", async (req, res) => {
  let cart = await Cart.find({ cartProductCustomerId: req.params.id });
  res.send(cart);
});

app.get("/get-product-bycompany/:id", async (req, res) => {
  let product = await Product.find({ productCompanyId: req.params.id });
  res.send(product);
});

app.get("/get-coupon-bycompany/:id", async (req, res) => {
  let coupon = await Coupon.find({ couponCodeCompanyId: req.params.id });
  res.send(coupon);
});

app.post("/add-checkout", async (req, res) => {
  let checkout = Checkout(req.body);
  let result = await checkout.save();
  result = result.toObject();
  res.send(result);
});

schedule.scheduleJob("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    await Coupon.deleteMany({ couponCodeExpire: { $lt: currentDate } });
    console.log("Expired coupons deleted.");
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
});

app.delete("/delete-from-cart/:id", async (req, resp) => {
  let result = await Cart.deleteOne({ _id: req.params.id });
  resp.send(req.params);
});

app.delete("/empty-cart/:id", async (req, resp) => {
  let result = await Cart.deleteMany({ cartProductCustomerId: req.params.id });
  resp.send(req.params);
});

app.listen(4000);
