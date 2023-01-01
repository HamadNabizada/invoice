import express from 'express'
import {registerUser, loginUser} from '../controllers/userController.js'
import passport from 'passport'

let router = express.Router()

router.post('/register', registerUser)
router.post('/login',passport.authenticate('local'), loginUser)

export default router


