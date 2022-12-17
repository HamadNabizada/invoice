import express from 'express'
import dotenv from 'dotenv'
import invoiceRoutes from './routes/invoiceRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'

import cookieParser from 'cookie-parser'

dotenv.config()
let port = process.env.PORT || 5000
let app = express()
connectDB()

app.use(cors({
    origin:'*',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))
app.use(cookieParser('keyboard cat'))




app.use('/user', userRoutes)
app.use('/', invoiceRoutes)

app.listen(port, (error)=>{
    if(!error){
        console.log(`Server running on port: ${port}.`);
    }
    else{
        console.log(`Error: ${error}`);
    }
})