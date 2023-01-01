import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler' 
import bcrypt from 'bcryptjs'


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

let loginUser = async (req,res)=>{
  let { email, password } = req.body
  let user = await User.findOne({'email':email})
  let errorStack = []
  if(!user){
    errorStack.push({'error':'Email does not exist'})
    return res.json(errorStack)
  }
  if(user){
    let isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(isPasswordCorrect){
      req.session.userId = user.id
      return res.json('Logging In...')
    }
    else{
      errorStack.push({'error':'Incorrect Password'})
      return res.json(errorStack)
    }
    
  }
  else{
    return res.json('UNKOWN ERROR')
  }
}



export {registerUser,loginUser,}