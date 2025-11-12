import mongoose from "mongoose";

export const connection = async ()=>{
    try {
        const url = process.env.MONGO_URI
        console.log(url)
        await mongoose.connect(url)
        console.log(`Database connected successfully to : ${url}`)
    } catch (error) {
        console.log(error.message)
        console.log("Falied to connect Database !!! ")
    }
}