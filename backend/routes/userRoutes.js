import express from 'express'
import {getUser,updateExampleUser, getExampleUser} from '../controllers/userController.js'

let router = express.Router()

router.get('/',getUser)
router.get('/ExampleUser',getExampleUser)
router.put('/ExampleUser',updateExampleUser)

export default router