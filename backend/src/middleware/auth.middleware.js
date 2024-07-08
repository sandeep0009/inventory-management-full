import { verifyToken } from "../utils/token.js";
import CustomError from "../errors/customError.js";
import jwt from "jsonwebtoken"

const JWT_Secret="536478rijhgdfjk"



export const vaildateMiddleWare=async(req,res,next)=>{
    try{
        const headers = req.headers['authorization'];
     

        if(!headers  || !headers.startsWith("Bearer ")){
            throw new CustomError(404,"Please Login first");
        }

        const auth_token = headers.split(" ")[1]
      

        if(!auth_token){
            throw new CustomError(404,"Please Provide valid")
        }

        const data =jwt.verify(auth_token,JWT_Secret)
        req.user =data.userid
        next()

} catch (error) {
        next(error)
}
}