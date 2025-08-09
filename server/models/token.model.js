import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    name : String,
    symbol : String,
    totalSupply : String,
    creator : {
        type : String
    },
    contractId : String,
    createdAt : Date
})

const Token = mongoose.model("Token",tokenSchema)

export default Token