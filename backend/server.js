import express from 'express'
import dotenv from 'dotenv'


dotenv.config()
let port = process.env.PORT | 3000

let app = express()

app.listen(port, (error)=>{
    if(!error){
        console.log(`Server running on port: ${port}.`);
    }
    else{
        console.log(`Error: ${error}`);
    }
})