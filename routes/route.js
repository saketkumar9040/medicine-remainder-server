import express from "express";
import {
  addReminder,
  deleteReminder,
  editReminder,
  getReminderList,
} from "../controllers/reminderController.js";
import { addUserDetails, createUser } from "../controllers/userController.js";

const router = express.Router();

//   USER  API'S  ==================================================================================>

router.post("/createUser", createUser);
router.post("/addUserDetails", addUserDetails);

//  REMINDER API'S  ================================================================================>

router.post("/addReminder", addReminder);
router.post("/getReminderList", getReminderList);
router.post("/editReminder", editReminder);
router.post("/deleteReminder", deleteReminder);

export default router;
