const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, deleteProduct } = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/auth");

// Public: View products
router.get("/", getAllProducts);

// Admin only: Add and delete
router.post("/", protect, isAdmin, createProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
