import express from "express";
import { addRemainder } from "../controllers/remainderController.js";
import { addUserDetails } from "../controllers/userController.js";

const router = express.Router();

router.post("/addRemainder",addRemainder);
router.post("/addUserDetails",addUserDetails);

export default router;
 