const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // assumes multer is configured here
const productsController = require("../controller/productsController");

// ✅ Add product with multiple images
router.post("/add", upload.array("images", 5), productsController.addProduct);

// ✅ Get all products
router.get("/all", productsController.getAllProducts);

// ✅ Get product by ID
router.get("/:id", productsController.getProductById);

// ✅ Update stock
router.put("/update-stock/:id", productsController.updateStock);

// ✅ Update offer
router.put("/update-offer/:id", productsController.updateOffer);

// ✅ Replace product images (optional: can be PUT or POST)
router.put("/upload-images/:id", upload.array("images", 5), productsController.uploadImages);

module.exports = router;
