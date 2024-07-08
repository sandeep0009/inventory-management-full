import CustomError from "../errors/customError.js";
import profile from "../models/profile.model.js";
import user from "../models/user.schema.js";
import { generateToken } from "../utils/token.js";

class UserService{

    static async registerUser(body){
        const {email,password,name}=body;

        const existUser=await user.findOne({email});
        if(existUser){
            throw new CustomError(404,"user already exist");
        }

        const newUser=await user.create({email,password,name});
        await newUser.save();

            
                    const token=generateToken(newUser);
                    const refreshToken=generateToken(newUser,"2d");
        await profile.create({
            user:newUser._id,
            refresh_token:refreshToken
        });
        return {
            message:"user created successfully",
            token:token
        }


    }

    static async loginUser(body){

        const {email,password}=body;

        const userExist=await user.findOne({email});
        if(!userExist){
            throw new CustomError(404,"invalid credentials")
        }

        if(userExist.password!==password){
            throw new CustomError(404,"invalid credentials")
        }

        const token=generateToken(userExist)  
        return {
            message:"user login successfully",
            token:token
        }

    }

    static async profileUser(userId){
   
       
        const userExist= await user.findById(userId).select("name email");
        if(!userExist){
            throw new CustomError(404,"invalid credentials")
        }

        return {
            data:userExist
        }


    }

}

export default UserService