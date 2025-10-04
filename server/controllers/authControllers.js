import {User} from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'


export const registerUser = async(req,res) => {
    const {fullName, email, password, bio} = req.body;
    try {
        
        if(!fullName || !email || !password || !bio){
            return res.json({success : false, message : "All fields are mendatory.."})
        }

        const existedUser = await User.findOne({email})

        if(existedUser){
            return res.json({success: false, message: "User is Already Exists..."})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            fullName,
            email, 
            password : hashedPassword,
            bio
            })

        const token = generateToken(newUser._id)
        res.json({success:true, userData: newUser,token, message: "Account created Successfully" })

    } catch (error) {
         return res.json({success: false, message: error.mesage})
    }

}

export const loginUser = async(req,res) => {
    
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.json({success:false, message: "All fields are required.."})
        }

        const userData = await User.findOne({email})

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id);
        res.json({ success: true, userData, token, message: "Login successful" });
        
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

export const checkAuth = async(req,res) => {
    res.json({success:true, user: req.user})
}

export const updateProfile = async(req,res) => {
   try {
     const {profilePic, bio, fullName} = req.body;
     const userId = req.user._id
     let updatedUser;
     if(!profilePic){
         updatedUser = await User.findByIdAndUpdate(userId,{bio,fullName},{new: true})
     }else{
         const upload = await cloudinary.uploader.upload(profilePic)
         updatedUser = await User.findByIdAndUpdate(userId,{bio, fullName, profilePic: upload.secure_url},{new: true})
     }
     res.json({success:true, message:"User updated", user: updatedUser})
   } catch (error) {
    return res.json({success:false, message: error.mesage});
   }
}