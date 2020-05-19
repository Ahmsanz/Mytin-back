const express = require('express')

const router = express.Router();

const Plan = require('../models/plansModel')

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

router.get('/all',
(req, res) => {
    Plan.find({})
        .then(files => {
            console.log('sending all the plans right away')
            res.send(files)
        })
        .catch(err => console.log(err));
});

router.get('/city/:city',
(req, res) => {   
      let {city} = req.params;
      console.log(city)
      Plan.find({city})
        .then(plans => {res.send(plans)})
        .catch(err => console.log(err));
});

router.get('/itinerary/:nest',
(req, res) => {
      let {nest} = req.params;
      console.log(itinerary)
      Plan.find({itinerary: nest})
        .then(plans => {console.log('these are the plans', plans); res.send(plans)})
        .catch(err => console.log('nope', err));
});



module.exports = router;