import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler' 
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
      });
    });
}));


let registerUser = asyncHandler(async (req,res)=>{
  let {email,password} = req.body

  let emailDuplicate = await User.findOne({'email':email})
  if (emailDuplicate){
    res.json([{'error':'Email already exists'}])
  }else{
    let hashedPassword = crypto.createHash('sha256','secret')
      .update(password)
      .digest('hex')

    User.create({email,password: hashedPassword})
    res.json('User Created')
  }
})

let loginUser = asyncHandler(async (req,res)=>{
  res.json('Attempting to log user in...')
})

export {registerUser,loginUser}