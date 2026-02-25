const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true , "Img url is requried for creating an post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:[true , "User id is required for creating an post"]
    }
})

const postModel = mongoose.model("posts" , postSchema)

module.exports = postModel;