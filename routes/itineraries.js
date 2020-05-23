const express = require('express')

const router = express.Router()

const Itin = require('../models/itineraryModel');

const Comment = require('../models/commentsModel');

/**
   * @api {get} /itineraries/ 
   * @apiDescription get all the itineraries in the database
   * @apiVersion 1.0.0
   * @apiName getItineraries
   * @apiGroup itineraries
   *
   * @apiParam  No params
   *
   * @apiSuccess {array} Itineraries from database
   
   */
router.get('/', (req, res) => {
    Itin.find({})
    .then( files => res.send(files))
    .catch( err => console.log(err))
})

/**
   * @api {get} /itineraries/city/:city 
   * @apiDescription get all the itineraries related to the given city name
   * @apiVersion 1.0.0
   * @apiName get itineraries by city
   * @apiGroup itineraries
   *
   * @apiParam  {String} city name
   *
   * @apiSuccess {array} Itineraries from database that have city: "city name" as property
   
   */
router.get('/city/:city', (req, res) => {
    let {city} = req.params;
    Itin.find({city})
    .then( files => {console.log(files); res.send(files)})
    .catch( err => console.log(err))
})

/**
   * @api {get} /itineraries/itins/:id 
   * @apiDescription get a single itinerary, by id
   * @apiVersion 1.0.0
   * @apiName get itinerary by id
   * @apiGroup itineraries
   *
   * @apiParam  {String} id of the itinerary requested
   *
   * @apiSuccess {object} itinerary document from database
   *
   */
router.get('/itins/:id', (req, res) => {
  let {id} = req.params;
  Itin.find({_id: id})
  .then( file => {console.log('this is the itinerary requested', file); res.send(file)})
  .catch( err => console.log('something went wrong', err))
})

/**
   * @api {get} /itineraries/comment/:itinId 
   * @apiDescription get all the comments related to a given itinerary
   * @apiVersion 1.0.0
   * @apiName get itineraries' comments
   * @apiGroup itineraries
   *
   * @apiParam  {String} id of the itinerary requested
   *
   * @apiSuccess {Array} comments 
   
   */
router.get('/comments/:itinId', (req, res) => {
  let {itinId} = req.params;
  Comment.find({
    itinId
  })
  .then( files => {console.log('sending the comments');res.send(files)})
  .catch( err => console.log('wrong', err))
})

/**
   * @api {post} /itineraries/comment 
   * @apiDescription Adds a comment to the itinerary 
   * @apiVersion 1.0.0
   * @apiName comment on itinerary
   * @apiGroup itineraries
   *
   * @apiBody  {Object} containing the itinerary id, the user data and the comment body
   *
   * @apiSuccess {array} comment added to the database
   *
   */
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
