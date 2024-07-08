import UserService from "../services/userService.js";
import { CatchAsync } from "../utils/catchSync.js";

class UserController{

    static RegisterUser=CatchAsync(async(req,res)=>{
        const userObject=await UserService.registerUser(req.body);
        return res.status(201).json({message:"created user", userObject});
    })

    static LoginUser=CatchAsync(async(req,res)=>{
        const userLoginDetails=await UserService.loginUser(req.body);
        res.setHeader('Authorization', userLoginDetails.token);
        return res.status(201).json({message:"login successful", userLoginDetails})

    })

    static ProfileUser=CatchAsync(async(req,res)=>{
        const userLoginDetails=await UserService.profileUser(req.user);
        return res.status(201).json({message:"login successful", userLoginDetails})

    })

}


export default UserController;
