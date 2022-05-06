const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
 
  firstname: {
     type: String,
      required: true
  },
  lastname: {
    type: String,
    required:true
  },
  email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required:true
    },
  created_At:{
      type: Date,
      default: Date.now
  }

});

module.exports = mongoose.model("User", usersSchema);