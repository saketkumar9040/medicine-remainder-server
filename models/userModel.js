import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name:String,
     gender:String,
     email:String,
     phone:Number,
     watsApp:Number,
     deviceId:String,
     FCMToken:[String],
     profilePicUrl:String,
     createdAt:Date,
     updatedAt:Date,
});

export const User = mongoose.model("users",userSchema);