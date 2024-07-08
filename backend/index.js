import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDb } from "./db/db.js";
import router from "./routes/route.js";
const app=express();
dotenv.config()


app.use(cors());
app.use(express.json());
connectionDb();

app.use('/api',router)


app.listen(process.env.PORT,()=>{
    console.log(`connected to backend ${process.env.PORT}`)
})
