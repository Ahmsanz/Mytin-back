const express = require('express');

const router = express.Router();

const User = require('../models/usersModel')

const jwt = require('jsonwebtoken');

const passport = require('passport');

const bcrypt = require('bcrypt');

const key = require('../k8s/keys')



// router.get('/login', passport.authenticate('jwt', {session: false}), (req, res) => {
//     User.findOne({_id: req.user._id})
//     .then( user => res.json(user))
//     .catch(err => res.status(400).json({error: 'You shall not pass! Identify yourself'}))
// })

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
            
            jwt.sign ({user}, key.secretOrKey, {expiresIn: 3600}, (err, token) => {
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







module.exports = router;