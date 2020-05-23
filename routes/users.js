const express = require('express');

const router = express.Router();

const User = require('../models/usersModel')

const Comment = require('../models/commentsModel');

const Message = require('../models/messagesModel')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { secretOrKey } = require('../config');

const key = secretOrKey;


/**
   * @api {get} /users/
   * @apiDescription retrieves all the users in the database
   * @apiVersion 1.0.0
   * @apiName get users
   * @apiGroup users
   *
   * @apiParam  none
   *
   * @apiSuccess {Array} users documents
   *
   */
router.get('/', (req, res) => {
    User.find({})
    .then( users => {
        res.send(users)
    })
    .catch( err => console.log(err))
})


/**
   * @api {put} /users/favs/add/:userId
   * @apiDescription adds an itinerary to the user's document after setting it as favourite in the front
   * @apiVersion 1.0.0
   * @apiName add favourite
   * @apiGroup users
   *
   * @apiParam  {string} user id
   *
   * @apiSuccess itinerary id added as favourite in user's favourites array
   *
   */
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


/**
   * @api {put} /users/favs/remove/:userId
   * @apiDescription deletes an itinerary from favourites array
   * @apiVersion 1.0.0
   * @apiName unfavourite itinerary
   * @apiGroup users
   *
   * @apiParam  {String} user id
   *
   * @apiSuccess itinerary id is removed from favourites array
   *
   */
router.put('/favs/remove/:userId', (req, res) => {
  let { userId } = req.params;
  let fav  = req.body.id;
  User.findOneAndUpdate({_id: userId}, {
    $pull: {'favourites': fav }
  })
  .then( user => {console.log('the user now has this itineraries as favourites', user); res.status(200).json({msg: 'itinerary removed favourite'})})
  .catch( err => {console.log('something went wrong', err); res.status(500).json("we coudn't remove that favourite")})
})


/**
   * @api {get} /users/:userId/favs/
   * @apiDescription retrieves all the user's favourites
   * @apiVersion 1.0.0
   * @apiName get user's favourites
   * @apiGroup users
   *
   * @apiParam  {String} user id
   *
   * @apiSuccess {Array} user's favourites
   *
   */
router.get('/:userId/favs/', (req, res) => {
  let {userId} = req.params;
  User.findOne({_id: userId})
  .then( user => {console.log(user); res.send(user.favourites)})
  .catch( err => res.status(400).json({msg: 'something went wrong retrieving the favourites'}))
})


/**
   * @api {get} /users/:userId/comments
   * @apiDescription retrieves all the user's comments
   * @apiVersion 1.0.0
   * @apiName get user's comments
   * @apiGroup users
   *
   * @apiParam  {String} user id
   *
   * @apiSuccess {Array} user's comments
   *
   */
router.get('/:userId/comments/', (req, res) => {
  let {userId} = req.params;
  Comment.find({userId})
  .then( comments => {console.log(userId, comments); res.send(comments)})
  .catch( err => res.status(400).json({msg: 'something went wrong with the user comments'}))
})


/**
   * @api {post} /users/register
   * @apiDescription adds new user to database
   * @apiVersion 1.0.0
   * @apiName post user
   * @apiGroup users
   *
   * @apiBodyRequest nee user document body
   *
   * @apiSuccess new user's document created in the database
   *
   */
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


/**
   * @api {post} /users/message/send
   * @apiDescription post a message from the user in the contact component
   * @apiVersion 1.0.0
   * @apiName post message
   * @apiGroup users
   *
   * @apiBodyRequest all the user's data and the message's body
   *
   * @apiSuccess message correctly added to database
   *
   */
router.post('/message/send', (req, res) => {
  const { userId, userMail, userFirstName, userLastName, date, message } = req.body;

  new Message({
    userId,
    userMail, 
    userFirstName,
    userLastName,
    date,
    message
  }).save()
  
  console.log('new message received', res.body);
  res.status(200).json({msg: 'new message correctly recieved'})
})

module.exports = router;
