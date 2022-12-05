import express from 'express'
import { getLogin } from '../controllers/authController.js'

let router = express.Router()

router.get('/login',getLogin)

export default router