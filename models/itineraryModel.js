const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({

  name: {
      type: String,
      required: true
    },
  city: {
        type: String,
        required: true
    },
  rating: {
      type: Number

  },
  image: {
    type: String

  },
  duration: {
      type: String

  },
  price: {
      type: Number

  },
  hashtags: {
      type: String

  },
  nest: {
    type: String
  },
  activities: [
    {
      title: String,
      img: String
    }
  ],
  favourite: {
    type: Boolean
  }

})

module.exports = mongoose.model('itinerary', itinerarySchema)
