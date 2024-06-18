import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect(process.env.MONGO_DB_STRING).then(()=>console.log("DB Connected"));
   
}