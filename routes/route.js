import express from "express";
import { addReminder } from "../controllers/remainderController.js";
import { addUserDetails, createUser } from "../controllers/userController.js";

const router = express.Router();

//   USER  API'S  ==================================================================================>

router.post("/createUser",createUser);
router.post("/addUserDetails",addUserDetails);

//  REMINDER API'S  ================================================================================>

router.post("/addReminder",addReminder);

export default router;
 ;