const express = require('express')

const router = express.Router()

const Itin = require('../models/itineraryModel');

const Comment = require('../models/commentsModel');

router.get('/', (req, res) => {
    Itin.find({})
    .then( files => res.send(files))
    .catch( err => console.log(err))
})

router.get('/city/:city', (req, res) => {
    let {city} = req.params;
    Itin.find({city})
    .then( files => {console.log(files); res.send(files)})
    .catch( err => console.log(err))
})

router.get('/itins/:id', (req, res) => {
  let {id} = req.params;
  Itin.find({_id: id})
  .then( file => {console.log('this is the itinerary requested', file); res.send(file)})
  .catch( err => console.log('something went wrong', err))
})

router.get('/comments/:itinId', (req, res) => {
  let {itinId} = req.params;
  Comment.find({
    itinId
  })
  .then( files => {console.log('sending the comments');res.send(files)})
  .catch( err => console.log('wrong', err))
})
router.post('/comment', (req, res) => {
  let { userId, userName, userPic, itinId, comment, date } = req.body;

  let newComment = new Comment({
    userId,
    userName,
    userPic,
    itinId,
    comment,
    date
  });
  newComment.save()
  .then( comment => console.log('new comment saved into database', comment))


})
module.exports = router;
