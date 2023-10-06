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

export const getReminderList = async (req,res) => {
  try {
    const {userId} = req.body.data;
     
    const list = await Reminder.find({userId});

    return res.status(200).json({
      success:true,
      message:"Reminder list fetched successfully",
      data:list
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
};

export const deleteReminder = async (req,res) => {
  try {
    const {id}=req.body.data;
    console.log(id)
    const deleteData = await Reminder.findByIdAndDelete(id);
    return res.status(200).json({
      success:true,
      message:"Reminder deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}
