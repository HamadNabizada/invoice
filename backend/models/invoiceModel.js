import mongoose from "mongoose";

let invoiceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },
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
    'invoiceDate':Date,
    'paymentDue':Date,
    'paymentTerms':Number,
    'projectDescription':String,
    'itemList':[{
        'itemName':String,
        'itemQty':Number,
        'itemPrice':Number,
        'listItemTotal':Number,
        'listItemTotalFormatted': String
    }],
    'totalInvoice':Number,
    'totalInvoiceFormatted':String,
    'invoiceStatus':String
})

export default mongoose.model('Invoice', invoiceSchema)