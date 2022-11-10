import express from 'express'

let router = express.Router()

router.get('/', (req,res)=>{
    res.json({message: 'json msg router'})
})
router.

export default router