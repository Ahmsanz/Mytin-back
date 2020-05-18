const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  userPic: {
    type: String
  },
  userId: {
    type: String
  },
  comment: {
    type: String
  },
  date: {
    type: String
  },
  itinId: {
    type: String
  }
})

module.exports = mongoose.model('comment', commentSchema)
