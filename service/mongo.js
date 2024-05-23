import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING));
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}