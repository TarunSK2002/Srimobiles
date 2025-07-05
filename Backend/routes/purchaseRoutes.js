const express = require("express");
const router = express.Router();
const purchasesController = require("../controller/purchasesController");

router.post("/add", purchasesController.addPurchase);

router.get("/all", purchasesController.getAllPurchases);

module.exports = router;
