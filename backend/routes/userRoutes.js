import express from 'express'
import {registerUser} from '../controllers/userController.js'
import passport from 'passport'

let router = express.Router()

router.post('/register', registerUser)
router.post('/login',  (req, res, next) => {
  if(req.isAuthenticated()){
    return res.json({redirect:'/'})
  }
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, err => {
        if (err) { return next(err); }
        return res.json({ message: 'Success' });
      });
    })(req, res, next);
})



export default router


