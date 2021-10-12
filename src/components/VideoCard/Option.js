import React, { useState } from 'react'
import '../VideoCard/Option.css'
import { MdWatchLater } from 'react-icons/md'
import { RiPlayListAddLine } from 'react-icons/ri'
import { useVideo } from '../../context/VideoContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router'
import { networkCall } from '../../utils/networkCall'
import { usePlaylist } from '../../context/PlaylistContext'
import callToastify from '../Toast/toast'


const Option = (props) => {
    const navigate = useNavigate()
    const { dispatch } = useVideo()
    const { authState } = useAuth()
    const { playlistState, playlistDispatch } = usePlaylist()

    const saveToWatchLaterHandler = async (event) => {
        event.preventDefault()
        if (!authState.isLoggedIn) {
            navigate('/login')
        } else {
            const playlistID = playlistState.library?.find(playlist => playlist?.name === 'Watch Later')?._id
            const response = await networkCall(`/playlist/${playlistID}/${props.videoID}`, "POST")
            dispatch({ type: 'SET_SHOW_OPTIONS', payload: '' })
            if (response.data.success) {
                playlistDispatch({ type: 'ADD_VIDEO_TO_PLAYLIST', payload: response.data.playlist })
                callToastify('Video added to watch later', true)
            }
            else {
                callToastify('Already in watch later', false)
            }
        }
    }

    const saveToPlaylistHandler = (event) => {
        event.preventDefault()
        if (!authState.isLoggedIn) {
            navigate('/login')
        } else {
            dispatch({ type: 'SET_SHOW_MODAL', payload: props.videoID })
            dispatch({ type: 'SET_SHOW_OPTIONS', payload: '' })
        }
    }

    return (
        <div className='option'>
            <div>
                <button onClick={(e) => saveToWatchLaterHandler(e)}><MdWatchLater className='icon'
                /> Add to Watch later</button>
            </div>
            <div>
                <button onClick={(e) => saveToPlaylistHandler(e)}><RiPlayListAddLine className='icon' /> Add to Playlist</button>
            </div>
        </div>
    )
}

export default Option
