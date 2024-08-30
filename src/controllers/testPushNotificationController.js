const axios = require("axios");

class NotificationController {
  constructor() {
    this.expoPushUrl = "https://exp.host/--/api/v2/push/send";
  }

  async sendPushNotification(to, title, body, data = {}) {
    const message = {
      to,
      sound: "default",
      title,
      body,
      data
    };

    try {
      const response = await axios.post(this.expoPushUrl, message, {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  }
}

module.exports = new NotificationController();
