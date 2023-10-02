import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/dbConfig.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT,()=>{
    console.log(`server listening...`)
});