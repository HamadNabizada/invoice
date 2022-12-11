import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler' 



let registerUser = asyncHandler(async (req,res)=>{
    let data = await User.create(req.body)
    console.log(data);
    res.json('creating user...')
})

export {registerUser}