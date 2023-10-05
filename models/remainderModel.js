import mongoose from "mongoose";

const remainderSchema = new mongoose.Schema({
    medicineName:String,
    frequency:Number,
    time:Date,
    pillsCount:Number,
    createdAt:Date,
    updatedAt:Date,
    deviceId:String,
});

export const Remainder = mongoose.model("remainders",remainderSchema);