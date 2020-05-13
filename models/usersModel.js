const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
  
  first_name: {
      type: String,
      required: true
      
    },
  last_name: {
      type: String,
      required: false
  },
  googleID: {
    type: String
  },
  age: {
    type: Number
  },
  picture: {
    type: String
  },
  mail: {
      type: String, 
      required: false,
      unique: true
  },
  password: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  logged_in: {
    type: Boolean
  }, 
  role: {
    type: String
  }, 
  favourites: {
    type: Array,
    default: []
  }
  

  

})

module.exports = mongoose.model('user', userSchema)