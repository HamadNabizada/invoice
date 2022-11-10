import express from 'express'
import {getInvoices,postInvoices,putInvoices,deleteInvoices} from '../controllers/invoiceController.js'

let router = express.Router()

router.get('/', getInvoices)

router.post('/', postInvoices)

router.put('/:id', putInvoices)

router.delete('/:id', deleteInvoices)

export default router