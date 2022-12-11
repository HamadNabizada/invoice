import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    email: {
        type:String,
        unique: true
    },
    password:String
})

export default mongoose.model('User',userSchema)