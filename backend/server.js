import express from 'express'
import dotenv from 'dotenv'
import invoiceRoutes from './routes/invoiceRoutes.js'
import connectDB from './config/db.js'

dotenv.config()
let port = process.env.PORT || 5000
connectDB()

let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', invoiceRoutes)

app.listen(port, (error)=>{
    if(!error){
        console.log(`Server running on port: ${port}.`);
    }
    else{
        console.log(`Error: ${error}`);
    }
})