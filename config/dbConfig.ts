import mongoose from "mongoose";
const connectDb = async() =>{
    const connectionString = process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/Employee_Management";
    try {
        const connect = await mongoose.connect(connectionString);
        console.log(`MongoDB connected successfully : ${connect.connection.host} , ${connect.connection.port} , ${connect.connection.name}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;