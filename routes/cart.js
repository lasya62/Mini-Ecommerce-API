const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

router.post("/", protect, addToCart);               // Add or update item
router.get("/", protect, getCart);                  // View cart
router.delete("/:productId", protect, removeFromCart); // Remove item

module.exports = router;
