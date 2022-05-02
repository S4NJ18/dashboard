const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
 
  username: {
       type: String,
       required:true
  },
  password: {
     type: String,
      required: true
  },
  created_At:{
      type: Date,
      default: Date.now
  }

});

module.exports = mongoose.model("User", usersSchema);