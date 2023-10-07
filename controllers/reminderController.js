import { Reminder } from "../models/reminderModel.js";
import { User } from "../models/userModel.js";
import schedule from "node-schedule"
import { sendPushNotification } from "../utils/pushNotificationHandler.js";

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
    console.log(userData)

    const data = new Date(time);
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const messageText = `Hello ${userData.userName}, it's the time to take your medicine ${medicineName}.please do take it as health is the true wealth 😊`;

    schedule.scheduleJob({hour:hours,minute:minutes}, async () => {
      try {
        await sendPushNotification(userData.FCMToken[0], messageText);
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
