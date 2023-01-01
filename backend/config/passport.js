import LocalStrategy from 'passport-local'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

export default function (passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},async (email, password,done)=>{
            try {
                let userFound = await User.findOne({'email':email})
                if(!userFound){
                    return done(null,false)
                }
                
                bcrypt.compare(password, userFound.password, (err, res) => {
                    if (err) {
                      return done(err)
                    } 
                    if (res) {
                      return done(null,userFound)
                    }
                    else{
                        return done(null, false)
                    }
                });
            } catch (error) {
                console.log('test3');
                done(error)
            }
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
    });
}