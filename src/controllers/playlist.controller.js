import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    //TODO: create playlist
    if(!(name || description)) {
        throw new ApiError(400, "All fields are required")
    }

    const playlist = await Playlist.create({
        name,
        description,
    });

    return res 
     .status(200)
     .json(
        new ApiResponse(200, playlist, "Playlist added successfully")
     )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    if(!userId?.trim()) {
        throw new ApiError(400, "Something went wrong")
    }

    const userPlaylist = await Playlist.findById(userId)

    if(!userPlaylist) {
        throw new ApiError(400, "User playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, userPlaylist, "User Playlist fetching successfully")
    )

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id

     if(!playlistId?.trim()){
        throw new ApiError(400, "Something went wrong" )
     }

     const playlist = await Playlist.findById(playlistId)

     console.log(playlist)

     if(!playlist) {
        throw new ApiError(400, "Playlist not found")
     }
     return res 
      .status(200)
      .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetching successfully"
        )
      )

     
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!(playlistId && videoId)){
        throw new ApiError(404, "All fields are required")
    }

    const playlist = await Playlist.findOne({
        $or: [{playlistId}, {videoId}]
    })

    if(!playlist){
        throw new ApiError(400, "playlist not found")
    }

    if(!playlist.videos.includes(videoId)){
        playlist.videos.push(videoId)
        await playlist.save()
    }

    console.log(playlist)

    return res
     .status(200)
     .json(
        new ApiResponse(200, playlist, "Video add successfully")
     )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!playlistId && !videoId){
        throw new ApiError(400, "All field are required")
    }

    const playlist = await Playlist.findOne({
        $or: [{playlistId},{videoId}]
    })

    if(!playlist.includes(videoId)){
        playlist.videos.pop(videoId)
        await playlist.save()
    }

    return res
     .status(200)
     .json(
        new ApiResponse(200, {}, "Video remove successfully")
     )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!playlistId){
        throw new ApiError(400, "Something went wrong")
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    if(!playlist){
        throw new ApiError(400, "Playlist not found")
    }

    return res
     .json(
        new ApiResponse(200, {}, "Playlist delete successfully")
     )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if(!playlistId){
        throw new ApiError(400, "Playlist Id not found")
    }

    if(!(name || description)) {
        throw new ApiError(400, "All fields are required")
    }

    const playlist = await Playlist.findByIdAndUpdate(playlistId,{name, description})

    if(!playlist) {
        throw new ApiError(400, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist Updated successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}