import { Reminder } from "../models/reminderModel.js";
import { User } from "../models/userModel.js";
import schedule from "node-schedule";
import { sendPushNotification } from "../utils/pushNotificationHandler.js";
import { sendWatsAppNotification } from "../utils/watsAppNotificationHandler.js";
import { sendMessage } from "../utils/messageHandler.js";
import { sendMail } from "../utils/emailHandler.js";

export const addReminder = async (req, res) => {
  try {
    const {
      medicineName,
      frequency,
      time,
      pillsCount,
      pillsStock,
      caretakerNumber,
      userId,
    } = req.body.data;

    const saveData = await Reminder.create({
      medicineName,
      frequency,
      time,
      pillsCount,
      pillsStock,
      caretakerNumber,
      userId,
      createdAt: new Date(Date.now()),
    });

    //  SCHEDULE PUSH NOTIFICATION ===========================================================>
    const userData = await User.findById(userId);

    const data = new Date(time);
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const messageText = `Hello ${userData.userName.toUpperCase()}, it's the time to take your medicine ${medicineName.toUpperCase()}. please do take it as health is the true wealth 😊`;
    const watsAppMessageText = `Hello Dear, it's the time for ${userData.userName} to take his medicine ${medicineName} .please do remind him 😊`;

    schedule.scheduleJob({ hour: hours, minute: minutes }, async () => {
      try {
        await sendPushNotification(userData.FCMToken[0], messageText);
        await sendMail(userData.email,"Medicine Time ⏳",messageText);
        if (caretakerNumber) {
          await sendMessage(watsAppMessageText, caretakerNumber);
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    return res.status(201).json({
      success: true,
      message: "medicine reminder saved successfully",
      data: saveData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReminderList = async (req, res) => {
  try {
    const { userId } = req.body.data;

    const list = await Reminder.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Reminder list fetched successfully",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.body.data;
    const deleteData = await Reminder.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editReminder = async (req, res) => {
  try {
    const {
      id,
      medicineName,
      frequency,
      time,
      pillsCount,
      pillsStock,
      caretakerNumber,
    } = req.body.data;
    const updateReminder = await Reminder.findByIdAndUpdate(id, {
      medicineName,
      frequency,
      time,
      pillsCount,
      pillsStock,
      caretakerNumber,
    });
    return res.status(200).json({
      success: true,
      message: "Reminder updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC5b15a7a10ff6adc208332570b37bdbba";
// const authToken = "57f84d33ca1cb75567843513861fd59e";
// const verifySid = "VA6aad8e8fe92c7841d9d60f00c468c5ea";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+918709024917", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+918709024917", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
