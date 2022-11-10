import asyncHandler from 'express-async-handler'  

let getInvoices = asyncHandler(async (req, res)=>{
    res.json('GET CONTROLLER')
})

let postInvoices = asyncHandler(async (req, res)=>{
    res.json('POST CONTROLLER')
})

let putInvoices = asyncHandler(async (req, res)=>{
    res.json(`PUT CONTROLLER ${req.params.id}`)
})

let deleteInvoices = asyncHandler(async (req, res)=>{
    res.json(`DELETE CONTROLLER ${req.params.id}`)
})

export {getInvoices, postInvoices,putInvoices,deleteInvoices}