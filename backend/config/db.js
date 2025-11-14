import mongoose, { connect } from "mongoose"
const connectDb= async()=>{
    try{
        const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
        if (!mongoUri) {
            throw new Error("MongoDB URI is not defined. Please set MONGODB_URI environment variable.");
        }
        await mongoose.connect(mongoUri)
        console.log("db connected")
    }
    catch(error) {
        console.log("Database connection error:", error.message)

    }

}
export default connectDb;