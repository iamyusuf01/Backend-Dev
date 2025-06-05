import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    //* TODO: toggle subscription
    
    console.log(channelId)

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if(!channelId?.trim()) {
        throw new ApiError(400, " Channel Id missing")
    }

    const subscriber = await Subscription.aggregate([
        {
            $match: {
                channelId: channelId?.toLowerCase(),
            },
        },
        {
            $lookup: {
                from: "User",
                localField: "_id",
                foreignField: "subscribers",
                as: "channel"
            }
        }, 
    ])

    if(!subscriber?.length){
        throw new ApiError(400, "Subscriber is not available")
    }

    return res
     .status(200)
     .json(
        new ApiResponse(200, subscriber[0], "User subscribe find successfully")
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if(!subscriberId?.trim()) {
        throw new ApiError(400, "Subscriber not find")
    }

    const user =  await User.findById(req.user.id)

    if(!user){
        throw new ApiError(401, "Invalid subscribers")
    }
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}