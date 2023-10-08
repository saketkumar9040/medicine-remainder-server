const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

import twilio from "twilio";
const client = twilio(accountSid, authToken);

export const sendMessage = async (messageText,to) => {
    try {
        client.messages
    .create({
        body: messageText,
        from: '+12565489803',
        to: `+91${to}`
    })
    .then(message => console.log(message.sid))
    .done();
    } catch (error) {
         console.log(error.message) 
    }
}