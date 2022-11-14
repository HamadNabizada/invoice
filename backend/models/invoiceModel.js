import mongoose from "mongoose";

let invoiceSchema = mongoose.Schema({
    "invoiceID": String,
    "billFrom": {
        'street': String,
        'city':String,
        'zipCode':Number,
        'country':String
    },
    'billTo':{
        'clientName':String,
        'clientEmail':String,
        'clientStreet': String,
        'clientCity':String,
        'clientZipCode':Number,
        'clientCountry':String
    },
    // 'invoiceDate':Date,
    // 'paymentDue':Date,
    'paymentTerms':Number,
    'projectDescription':String,
    'itemList':[{
        'listItem':{
            'itemName':String,
            'itemQty':Number,
            'itemPrice':Number,
            'itemLineTotal':Number
        }
    }],
    'totalInvoice':Number,
    'invoiceStatus':String
})

export default mongoose.model('Invoice', invoiceSchema)