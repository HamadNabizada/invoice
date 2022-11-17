import express from 'express'
import {getInvoices,createInvoice,updateInvoice,deleteInvoices,
    getFilteredInvoices, getSingleInvoice} from '../controllers/invoiceController.js'
let router = express.Router()

router.get('/', getInvoices)
router.post('/', getFilteredInvoices)

router.post('/createNewInvoice', createInvoice)

router.get('/:id', getSingleInvoice)
router.put('/:id', updateInvoice)

router.delete('/:id', deleteInvoices)

export default router