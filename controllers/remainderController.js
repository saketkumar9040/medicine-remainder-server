import { Remainder } from "../models/remainderModel.js";

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

    saveData = await Remainder.create({...req.body.data,createdAt:new Date(Date.now())});
    
    return res.status(201).json({
      success: true,
      message: "medicine remainder saved successfully",
      data:saveData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


