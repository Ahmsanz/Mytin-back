const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  userMail: {
    type: String,
    required: true,
  },
  userFirstName: {
    type: String,
  },
  userLastName: {
    type: String,
  },
  date: {
    type: Date,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("message", messageSchema);
