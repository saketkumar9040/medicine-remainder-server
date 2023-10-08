const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

import twilio from "twilio";
const client = twilio(accountSid, authToken);

export const sendWatsAppNotification = async (body, to) => {
  try {
    await client.messages
      .create({
        body: body,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${to}`,
      })
      .then((message) => console.log(message.sid))
  } catch (error) {
    console.log(error.message);
  }
};
