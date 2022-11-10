import mongoose from "mongoose";

let invoiceSchema = mongoose.Schema({
    "billFrom": {
        'street': String,
        'city':String,
        'zipcode':Number,
        'country':String
    },
    'billTo':{
        'clientName':String,
        'clientEmail':String,
        'clientstreet': String,
        'clientcity':String,
        'clientzipcode':Number,
        'clientcountry':String
    },
    // 'invoiceDate':Date,
    // 'paymentDue':Date,
    'paymentTerms':Number,
    'productDescription':String,
    'itemList':{
        'listItem':{
            'itemName':String,
            'itemQTY':Number,
            'itemPrice':Number,
            'listItemTotal':Number
        }
    },
    'totalInvoice':Number
})

export default mongoose.model('Invoice', invoiceSchema)