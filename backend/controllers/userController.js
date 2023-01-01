import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler' 
import bcrypt from 'bcryptjs'
import passport from 'passport'


let registerUser = asyncHandler(async (req,res)=>{
  let {email,password} = req.body
  let emailDuplicate = await User.findOne({'email':email})
  if (emailDuplicate){
    res.json([{'error':'Email already exists'}])
  }else{
    let hashedPassword = await bcrypt.hash(password,10)

    User.create({email,password: hashedPassword})
    res.json('User Created')
  }
})


export {registerUser}