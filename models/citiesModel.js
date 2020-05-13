const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  
  name: {
      type: String,
      required: true,
      unique: true
    },
  country: {
      type: String,
      required: true
  },
  image: {
    type: String, 
    required: false
  }

})

module.exports = mongoose.model('city', citySchema)
