const followModel = require('../models/follow.model')

async function followUserController(req , res){

    const follower = req.user.username;
    const followee = req.params.username;

    const followUser = await followModel.create({
        follower : follower,
        followee : followee,
        user : followUser
    })

    res.status(201).json({
        message:`You are following ${followee}`,
        followUser
    })
}


module.exports = {followUserController};