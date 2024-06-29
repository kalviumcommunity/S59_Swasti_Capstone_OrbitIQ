const express = require("express");
const { createOrder } = require("../controllers/payment.controller")

const router = express.Router();

router.post("/", createOrder);

module.exports = router;
