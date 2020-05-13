const express = require('express');

const router = express.Router();

const User = require('../models/usersModel')

const Comment = require('../models/commentsModel')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { secretOrKey } = require('../config');

const key = secretOrKey;

router.get('/', (req, res) => {
    User.find({})
    .then( users => {
        res.send(users)
    })
    .catch( err => console.log(err))
})

router.put('/favs/add/:userId', (req, res) => {

  let { userId } = req.params;
  let fav  = req.body.id;
  console.log(userId, fav)
  console.log(req.body)
  User.findOneAndUpdate({_id: userId}, {
    $push: {'favourites': fav }
  })
  .then( user => {console.log('the user now has this itineraries as favourites', user); res.status(200).json({msg: 'itinerary added as favourite'})})
  .catch( err => {console.log('something went wrong', err); res.status(500).json("we coudn't add that favourite")})
})

router.put('/favs/remove/:userId', (req, res) => {
  let { userId } = req.params;
  let fav  = req.body.id;
  User.findOneAndUpdate({_id: userId}, {
    $pull: {'favourites': fav }
  })
  .then( user => {console.log('the user now has this itineraries as favourites', user); res.status(200).json({msg: 'itinerary removed favourite'})})
  .catch( err => {console.log('something went wrong', err); res.status(500).json("we coudn't remove that favourite")})
})

router.get('/:userId/favs/', (req, res) => {
  let {userId} = req.params;
  User.findOne({_id: userId})
  .then( user => {console.log(user); res.send(user.favourites)})
  .catch( err => res.status(400).json({msg: 'something went wrong retrieving the favourites'}))
})

router.get('/:userId/comments/', (req, res) => {
  let {userId} = req.params;
  Comment.find({userId})
  .then( comments => {console.log(userId, comments); res.send(comments)})
  .catch( err => res.status(400).json({msg: 'something went wrong with the user comments'}))
})

router.post('/register', (req, res) => {

    let user = req.body.data;

    let newUser = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        googleID: user.googleID,
        age: user.age,
        picture: user.picture,
        mail: user.mail,
        password: user.password,
        register_date: user.register_date

    })

    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;

            newUser.password = hash;


            newUser.save()
            .then( user => {
                const payload = {
                    id: user._id,
                    name: user.first_name,
                    mail: user.mail
                };

                const options = { expiresIn: 24*365*60*60*1000}

                jwt.sign(payload, key.secretOrKey, options, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        msg: 'New user registered correctly',
                        token
                    })

                })
            })
        })
    })

})

module.exports = router;
