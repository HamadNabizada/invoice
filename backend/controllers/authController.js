import asyncHandler from 'express-async-handler'  

let getLogin = asyncHandler(async (req,res)=>{
    res.json('loginpage')
})

export {getLogin}