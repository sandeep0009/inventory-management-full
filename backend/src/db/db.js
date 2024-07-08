import mongoose from "mongoose";
import CustomError from "../errors/customError.js";

export const connectionDb=async()=>{
    try {
    

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to database")
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        throw new CustomError(404,"error in database connection")
      
        
    }
}