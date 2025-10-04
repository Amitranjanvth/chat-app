import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    fullName : {
        type: String,
        required : true,

    },
    password: {
        type: String,
         required: [true, 'Password is required']
    },
    profilePic : {
        type: String,
    },
    bio : {
        type : String
    }
})

export const User = mongoose.model("User", userSchema)






