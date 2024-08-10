import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DATABASE = {
            dbName: "dmms",
        }
        await mongoose.connect(DATABASE_URL, DATABASE);
        console.log("Database Connected Successfully.")
    } catch (error) {
        console.log("Failed to connect Database : " + error);
    }
}

export default connectDB;