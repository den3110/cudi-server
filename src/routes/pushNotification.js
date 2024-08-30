const express = require("express");

const router = express.Router();

const TestPushNotificationController = require("../controllers/testPushNotificationController");

router.post(
  "/",
  TestPushNotificationController.sendPushNotification()
);

module.exports = router;
