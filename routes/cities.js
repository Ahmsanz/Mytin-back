const City = require('../models/citiesModel')

const express = require('express');

const router = express.Router();



router.get('/', (req, res) => {
    City.find({})
    .then( cities => {
        res.send(cities);
    })
    .catch(err => console.log(err))
})

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
