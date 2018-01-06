const mongoose = require('mongoose')

module.exports = mongoose.model('Picture', mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: Boolean,
    required: true
  },
  data: {
    type: String,
    required: true
  }
}))
