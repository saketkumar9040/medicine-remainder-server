import express from "express";
import { addRemainder } from "../controllers/remainderController.js";

const router = express.Router();

router.post("/addRemainder",addRemainder);

export default router;
 