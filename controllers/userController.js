import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { deviceId, FCMToken } = req.body.data;
    if (
      deviceId === "" ||
      FCMToken === "" ||
      deviceId === undefined ||
      FCMToken === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "invalid device id / FCMToken",
      });
    }
    const userExists = await User.findOne({ deviceId });
    if (!userExists) {
      const createUser = await User.create({
        deviceId,
        FCMToken: [FCMToken],
        createdAt: new Date(Date.now()),
      });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createUser,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        data: userExists,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { deviceId } = req.body.data;
    console.log(deviceId);

    if (deviceId === undefined) {
      return res.status(400).json({
        success: false,
        message: "device id is undefined",
      });
    }
    console.log(deviceId);
    const userData = await User.findOne({ deviceId });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "No user Data found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addUserDetails = async (req, res) => {
  try {
    console.log(req.body);
    const {
      userName,
      gender,
      email,
      phone,
      watsAppNumber,
      profilePicUrl,
      deviceId
    } = req.body.data;

    const createUser =await User.findOneAndUpdate({deviceId},{userName,gender,email,phone,watsAppNumber,profilePicUrl, updatedAt: new Date(Date.now())},{
      new:true,
      upsert:true
    });
    if(!createUser){
      return res.status(404).json({
        success:false,
        message:"No user found"
      })
    };
    
    return res.status(200).json({
      success: true,
      message: "User details saved Successfully",
      data:createUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
