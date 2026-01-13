const router = require("express").Router();
const cloudinaryController = require("./controllers/cloudinaryController");
router.use("/cloudinary", cloudinaryController);

module.exports = router;
