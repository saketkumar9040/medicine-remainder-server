import { Remainder } from "../models/remainderModel.js";

export const addRemainder = async (req,res) => {
    try {
        console.log(req.body)
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}