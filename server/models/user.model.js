import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    walletAddress : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    nonce : {
        type : String,
        required : true
    },
    username : String,
    bio : String,
    profileImage : String,
    createdAt : {
        type : Date,
        default : Date.now
    },
    lastLogin : Date,
    isActive : {
        type : Boolean,
        default : true,
    }
})

const User = mongoose.model(userSchema, "User")

export default User