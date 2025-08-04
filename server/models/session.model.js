import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    walletAddress : {
        type : String,
        required : true,
    },
    sessionToken : String,
    expiresAt : {
        type : Date,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Session = mongoose.model(sessionSchema, "Session")

export default Session