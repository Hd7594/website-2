const express = require("express");
const router = express.Router();

const User = require("../model/User");

const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/website/publish", fileUpload(), async (req, res) => {
  try {
    // console.log("oui");

    // console.log(req.files);
    const { title, description, price, condition, city, brand, size, color } =
      req.body;
    const product_picture = req.files.picture;

    const finalPicture = await cloudinary.uploader.upload(
      convertToBase64(product_picture)
    );

    const userPicture = new User({
      product_name: title,
      product_description: description,
      product_price: price,
      product_details: [
        { MARQUE: brand },
        { TAILLE: size },
        { ÉTAT: condition },
        { COULEUR: color },
        { EMPLACEMENT: city },
      ],
      product_image: finalPicture,
    });
    await userPicture.save();
    console.log(userPicture);
    res.json(userPicture);
  } catch (error) {
    res.status(404).json({ message: error.message });
    // console.log("picture not saved");
  }
});

module.exports = router;
