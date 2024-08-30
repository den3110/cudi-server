const express = require("express");
const authRouter = require("./auth"); // Đường dẫn đến file router auth
const calculatorRouter = require("./calculator"); // Đường dẫn đến file router calculator

const router = express.Router();

// Sử dụng các router đã nhập
router.use("/auth", authRouter);
router.use("/calculator", calculatorRouter);

module.exports = router;
