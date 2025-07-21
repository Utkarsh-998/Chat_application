import jwt from "jsonwebtoken"
export const isAuthencatied=async (req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({'message':"User is  not Authencatied"})
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(400).json({'message':"Token is not valid"})
        }
        req.id=decode.userId
        next()
    }
    catch(error){


    }
}