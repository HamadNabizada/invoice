import asyncHandler from 'express-async-handler'  
import Invoice from '../models/invoiceModel.js'

let getInvoices = asyncHandler(async (req, res)=>{
    let invoices = await Invoice.find()
    res.json(invoices)
})

let getFilteredInvoices = asyncHandler(async (req,res)=>{
    let filter = req.body.filter
    let filteredInvoices
    if(filter === 'All'){
        filteredInvoices = await Invoice.find()
    }else{
        filteredInvoices = await Invoice.find({invoiceStatus:filter})
    }
    res.json(filteredInvoices)
})

let postInvoices = asyncHandler(async (req, res)=>{
    await Invoice.create(req.body.newJSON)
    res.json('POST')
    
})

let putInvoices = asyncHandler(async (req, res)=>{
    res.json(`PUT CONTROLLER ${req.params.id}`)
})

let deleteInvoices = asyncHandler(async (req, res)=>{
    res.json(`DELETE CONTROLLER ${req.params.id}`)
})

export {getInvoices, postInvoices,putInvoices,deleteInvoices, getFilteredInvoices}