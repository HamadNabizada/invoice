import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    name:String,
    lightMode:Boolean
})

export default mongoose.model('User',userSchema)