const express = require('express');
const requestRouter = express.Router();

const { userAuth }= require('../middlewares/auth');
const user = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res
                .status(400)
                .json({ message: "Invalid status type: "+status});
        }

        const toUser = await user.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({ message: "user not found!"});
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId},
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        }); 

        if(existingConnectionRequest){
            res.status(400).send({ message: "connection Request already exists!!" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });
    } catch(err) {
        res.status(400).send("ERRoR: "+err.message);
    }
});

module.exports = requestRouter;