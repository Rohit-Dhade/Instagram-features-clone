const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    username : {
        type:String,
        required:[true , "Username is required for requesting."]
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status can only be pending , accepted or rejected",
      },
    },
})

const requestModel = mongoose.model('requests' , requestSchema);

module.exports = requestModel;