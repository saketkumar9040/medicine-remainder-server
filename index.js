import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./configs/dbConfig.js";
import router from "./routes/route.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use("/",router);

app.listen(process.env.PORT,()=>{
    console.log(`server listening...`)
});