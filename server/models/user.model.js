import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    publicKey : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    xp : {
        type : Number
    }
})

const User = mongoose.model(userSchema, "User")

export default User