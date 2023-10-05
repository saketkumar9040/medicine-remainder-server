import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     userName:String,
     gender:String,
     email:String,
     phone:Number,
     watsAppNumber:Number,
     deviceId:String,
     FCMToken:[String],
     profilePicUrl:String,
     createdAt:Date,
     updatedAt:Date,
});

export const User = mongoose.model("users",userSchema);