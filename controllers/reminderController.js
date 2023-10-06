import { Reminder } from "../models/reminderModel.js";

export const addReminder = async (req, res) => {
  try {
    console.log(req.body);
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
