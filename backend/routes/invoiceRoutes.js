import express from 'express'
import {getInvoices,postInvoices,putInvoices,deleteInvoices,
    getFilteredInvoices} from '../controllers/invoiceController.js'
let router = express.Router()

router.get('/', getInvoices)
router.post('/', getFilteredInvoices)

router.post('/createNewInvoice', postInvoices)

router.put('/:id', putInvoices)

router.delete('/:id', deleteInvoices)

export default router