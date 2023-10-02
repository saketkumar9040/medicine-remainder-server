import mongoose from "mongoose";

const remainderSchema = new mongoose.Schema({
    name:String,
    frequency:Number,
    duration:Number,
    
    
    createdAt:Date,
    updatedAt:Date
})