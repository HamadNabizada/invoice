import express from 'express'
import {registerUser} from '../controllers/userController.js'

let router = express.Router()

router.post('/register', registerUser)

export default router