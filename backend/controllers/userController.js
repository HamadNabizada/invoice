import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler' 

let getUser = asyncHandler(async (req,res)=>{
    let allUsers = await User.find()
    res.json(allUsers)
})
let getExampleUser = asyncHandler(async (req,res)=>{
    let id = '637752d1696137982d36f811'
    let exampleUser = await User.findById(id)
    res.json(exampleUser)
})

let updateExampleUser = asyncHandler(async (req,res)=>{
    let id = req.body._id
    let body = {...req.body}
    let updatedUser = await User.findByIdAndUpdate(id,body)
    res.json(updatedUser)
})

export {updateExampleUser, getUser,getExampleUser}