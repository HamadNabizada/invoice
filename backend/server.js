import express from 'express'
import dotenv from 'dotenv'
import invoiceRoutes from './routes/invoiceRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js'
import cors from 'cors'

dotenv.config()
let port = process.env.PORT || 5000
connectDB()

let app = express()
app.use(cors({
    origin:'*',
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/auth',authRoutes)
app.use('/', invoiceRoutes)
app.use('/profiles/users', userRoutes)

app.listen(port, (error)=>{
    if(!error){
        console.log(`Server running on port: ${port}.`);
    }
    else{
        console.log(`Error: ${error}`);
    }
})