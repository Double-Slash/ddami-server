import FCM from "fcm-node";
import dotenv from "dotenv";
dotenv.config();
const serverKey = process.env.FIREBASE_KEY; //put your server key here
const fcm = new FCM(serverKey);

export const sendMessage = (deviceToken, title, body) => {
  const message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: deviceToken,
    notification: {
      title,
      body,
      sound: "default",
      click_action: "FCM_PLUGIN_ACTIVITY",
      icon: "fcm_push_icon",
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.error("Push메시지 발송에 실패했습니다.");
      console.error(err);
      return;
    }

    console.log("Push메시지가 발송되었습니다.");
    console.log(response);
    console.log(response.results);
  });
};
