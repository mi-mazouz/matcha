 const mongoose = require('mongoose')

 module.exports = mongoose.model('User', mongoose.Schema({
   firstName: {
     type: String,
     required: true
   },
   lastName: {
     type: String,
     required: true
   },
   username: {
     type: String,
     required: true
   },
   mail: {
     type: String,
     required: true,
     unique: true,
     lowercase: true
   },
   password: {
     type: String,
     required: true
   },
   bio: {
     type: String,
     default: null
   }
 }))
