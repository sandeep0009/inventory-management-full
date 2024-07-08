import mongoose from "mongoose";

const profileSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    refresh_token:{
        type:String,
        default:''
       }
},{timestamps:true})
const profile=mongoose.model('profile',profileSchema);
export default profile;