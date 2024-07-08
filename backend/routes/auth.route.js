import { Router } from "express";
import { registerUser } from "../controller/registerUser.js";

const auth=Router();

auth.post('/register',registerUser)

auth.get('/login',async(req,res)=>{
    return res.status(201).json({message:"hello"})
})

export default auth;