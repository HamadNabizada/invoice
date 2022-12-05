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

let createInvoice = asyncHandler(async (req, res)=>{
    await Invoice.create(req.body.newJSON)
    res.json('POST')
    
})
let updateInvoice = asyncHandler(async (req, res)=>{
    let id = req.params.id
    let selectedInvoice = await Invoice.findByIdAndUpdate(id,req.body)
    res.json('update')
})

let deleteInvoices = asyncHandler(async (req, res)=>{
    let deletedInvoice = await Invoice.findByIdAndDelete(req.params.id)
    res.json(`DELETE CONTROLLER ${req.params.id}`)
})

let getSingleInvoice = asyncHandler(async (req,res)=>{
    let singleInvoice = await Invoice.findById(req.params.id)
    res.json(singleInvoice)
})


export {getSingleInvoice, getInvoices, createInvoice,updateInvoice,deleteInvoices, getFilteredInvoices}