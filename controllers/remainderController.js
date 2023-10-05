import { Remainder } from "../models/remainderModel.js";

export const addRemainder = async (req, res) => {
  try {
    console.log(req.body);
    const {
      medicineName,
      frequency,
      time,
      pillsCount,
      pillsStock,
      caretakerNumber,
      deviceId
    } = req.body;

    saveData = await Remainder.create(req.body);

    res.status(201).json({
      success: true,
      message: "medicine remainder saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


