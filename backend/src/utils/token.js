import jwt from "jsonwebtoken";
const JWT_Secret="536478rijhgdfjk"
export const generateToken=(user)=>{
    const token=jwt.sign({userid:user._id},JWT_Secret,{ expiresIn:"1d"})
    return token
    
}


export const verifyToken=(token)=>{
    const tokens=jwt.verify(token,JWT_Secret);
    return tokens;
}