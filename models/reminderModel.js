import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    medicineName:String,
    frequency:String,
    time:Date,
    pillsCount:String,
    pillsStock:String,
    createdAt:Date,
    updatedAt:Date,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    createdAt:Date
});

export const Reminder = mongoose.model("reminders",reminderSchema);