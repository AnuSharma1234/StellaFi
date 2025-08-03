import mongoose from "mongoose";

export const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database succesfully !!")
    }catch(error){
        console.log(`An error occured while connecting to the database, Error : ${error.message}`);
    }
}