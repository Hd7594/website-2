const mongoose = require("mongoose");

const User = mongoose.model("User", {
  product_name: String,
  product_description: String,
  product_price: Number,
  product_details: Array,
  product_image: Object,
});

module.exports = User;
