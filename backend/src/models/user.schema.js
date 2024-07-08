import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lower:true,
        required:[true,"Email is required"]
    }  ,
    password:{
        type:String, 
        trim:true, 
        required:[true,"Password is required"]
    }
},{timestamps:true})

const user=mongoose.model('user',userSchema);

export default user;