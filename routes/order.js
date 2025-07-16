const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { placeOrder, getMyOrders } = require("../controllers/orderController");

router.post("/", protect, placeOrder);   // Place order
router.get("/", protect, getMyOrders);   // View orders

module.exports = router;
