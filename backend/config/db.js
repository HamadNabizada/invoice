import mongoose from "mongoose"

let connectDB = async () =>{
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('error db')
    }
}

export default connectDB