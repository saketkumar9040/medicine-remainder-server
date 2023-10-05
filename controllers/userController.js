import { User } from "../models/userModel.js";

export const createUser = async (req,res) => {
  try {
     const {
      deviceId,
      FCMToken
     } = req.body.data;
     console.log(req.body)

    //  if(deviceId ==="" || FCMToken ==="" ||deviceId === undefined || FCMToken ===undefined){
    //      return res.status(400).json({
    //       success:false,
    //       message:"invalid device id / FCMToken"
    //      })
    //  };
     const userExists = await User.findOne({deviceId});
     if(!userExists){
       const createUser = await User.create({deviceId,FCMToken:[FCMToken],createdAt:new Date(Date.now())});
       return res.status(201).json({
        success:true,
        message:"User created successfully",
        data:createUser
       })
     }else{
      return res.status(200).json({
        success:true,
        message:"User details fetched successfully",
        data: userExists
      })
     }
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"unable to create user"
    })
  }
}

export const addUserDetails = async (req, res) => {
    try {
      console.log(req.body)
      const {
        name,
        gender,
        email,
        phone,
        watsAppNumber,
        deviceFCMToken,
        deviceId,
        // profilePicUrl,
        // createdAt:,
        // updatedAt:,
      } = req.body.data;
      // const createUser = User.create({});
      return res.status(200).json({
        success:true,
        message:"User details saved Successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };