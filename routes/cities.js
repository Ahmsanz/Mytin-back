const City = require('../models/citiesModel')

const express = require('express');

const router = express.Router();


/**
   * @api {get} /cities/
   * @apiDescription retrieves all the cities in the database
   * @apiVersion 1.0.0
   * @apiName get cities
   * @apiGroup cities
   *
   * @apiParam  none
   *
   * @apiSuccess {Array} cities from database
   *
   */
router.get('/', (req, res) => {
    City.find({})
    .then( cities => {
        res.send(cities);
    })
    .catch(err => console.log(err))
})


/**
   * @api {get} /cities/:id
   * @apiDescription retrieves a single city, by its id 
   * @apiVersion 1.0.0
   * @apiName get single city
   * @apiGroup cities
   *
   * @apiParam  {String} city id
   *
   * @apiSuccess {Object} city document
   *
   */
router.get('/:id', (req, res) => {
    let requestedCity = req.params.id;
    console.log(requestedCity)

    City.findOne({_id: requestedCity})
    .then( city => {
        console.log(city);
        res.status(200).send(city)
    })
    .catch( err => console.log(err))
})

module.exports = router;
