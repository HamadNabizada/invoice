import express from 'express'
import dotenv from 'dotenv'
import invoiceRoutes from './routes/invoiceRoutes.js'
import userRoutes from './routes/userRoutes.js'
// import {connection} from './config/db.js'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import passportConfig from './config/passport.js'
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose'
import flash from 'connect-flash'


dotenv.config()
let port = process.env.PORT || 5000
let app = express()

let connection = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use(session({
    secret: 'keyboard cat',
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    resave:false,
    saveUninitialized:false
}))

app.use(flash())
passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())
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