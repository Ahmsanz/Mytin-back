const express = require('express');

const router = express.Router();

const User = require('../models/usersModel')

const jwt = require('jsonwebtoken');

const passport = require('passport');

const bcrypt = require('bcrypt');

const { secretOrKey } = require('../config');

const key = secretOrKey;



router.post('/login/', (req,res) => {
    const {mail, password} = req.body;

    if ( !mail || !password ) {
        return (res.status(400).send('You are not allowed here'))
    }

    User.findOne({mail})
    .then( user => {
        if (!user) return (res.status(400).json({msg: 'Does not ring a bell'})) 

       bcrypt.compare(password, user.password)
        .then( match => {
            console.log(match)

            if (!match) { return res.status(400).send("Don't know you mate. Try again!")}
            
            jwt.sign ({user}, secretOrKey, {expiresIn: 3600}, (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    mail: user.mail,                    
                    msg: 'Welcome back, friend'
                }); 
                }
            )        
            
            })
        console.log('user', user);
        
    })
        
})

router.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile'] }
));

router.get( '/google/callback', passport.authenticate('google'), (req, res) =>  {   
        User.findOne({_id: req.user._id})        
        .then(user => {            
            console.log('user found in auth', user)
            jwt.sign (
                {_id: user._id,
                first_name: user.first_name},
                key,
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;                     
                    res.redirect(200, `http://localhost:3000/profile/&user=${user.mail}&token=${token}`)
                }
            )
        })
  
    }
);


module.exports = router;