import jwt from 'jsonwebtoken'
import {User} from '../models/userModels.js'

export const protectedRoutes = async(req,res,next) => {
    try {
        
        const token = req.headers.token;
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.json({success: false, message: "User not exits..."})
        }
        req.user = user;
        next();
    } catch (error) {
          return res.json({success: false, message: "Something went wrong while protecting routes"})
          console.log(error)
    }
}