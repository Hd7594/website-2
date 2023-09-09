const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const websiteRoutes = require("./routes/website2");
app.use(websiteRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server in service");
});
