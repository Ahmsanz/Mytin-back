const express = require('express')

const router = express.Router();

const Plan = require('../models/plansModel')


/**
   * @api {post} /plans/
   * @apiDescription adds a new plan to the database
   * @apiVersion 1.0.0
   * @apiName add plan
   * @apiGroup plans
   *
   * @apiRequestBody new plan information
   *
   * @apiSuccess plan added to activities collection in database
   *
   */
router.post('/', (req, res) => {
    const newPlan = new Plan({
        title: req.body.title,
        city: req.body.city,
        img: req.body.img,
        itinerary: req.body.itinerary
    })

    newPlan.save()
      .then(activity => {
      res.send(activity)
      })
      .catch(err => {
      res.status(500).send("Server error")}) 
});


/**
   * @api {get} /plans/all
   * @apiDescription retrieves all the activities documents from database
   * @apiVersion 1.0.0
   * @apiName get plans
   * @apiGroup plans
   *
   * @apiParam  none
   *
   * @apiSuccess {Array} gets activities from database
   * 
   *
   */
router.get('/all',
(req, res) => {
    Plan.find({})
        .then(files => {
            console.log('sending all the plans right away')
            res.send(files)
        })
        .catch(err => console.log(err));
});


/**
   * @api {get} /plans/city/:city
   * @apiDescription retrieves all the plans linked to a city name
   * @apiVersion 1.0.0
   * @apiName get plans by city name
   * @apiGroup plans
   *
   * @apiParam  {String} city name
   *
   * @apiSuccess {Array} plans from database with city: 'city name' as property
   * 
   * @apiError (404) city name not found 
   *
   */
router.get('/city/:city',
(req, res) => {   
      let {city} = req.params;
      Plan.find({city})
        .then(plans => {res.send(plans)})
        .catch(err => console.log(err));
});


/**
   * @api {get} /plans/itinerary/:nest
   * @apiDescription get the plans related to a given itinerary
   * @apiVersion 1.0.0
   * @apiName get plans by itinerary
   * @apiGroup plans
   *
   * @apiParam  {String} 'nest' property in itinerary
   *
   * @apiSuccess {Object} plans documents related to the given itinerary nest
   * 
   * @apiError (404) nest not found
   *
   */
router.get('/itinerary/:nest',
(req, res) => {
      let {nest} = req.params;
      Plan.find({itinerary: nest})
        .then(plans => {console.log('these are the plans', plans); res.send(plans)})
        .catch(err => console.log('nope', err));
});



module.exports = router;