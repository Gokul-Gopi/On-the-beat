import React, { useEffect, useState, useRef } from 'react'
import '../VideoPlaying/VideoPlaying.css'
import ReactPlayer from 'react-player'
import Modal from "../../components/Modal/Modal";
import { AiOutlineLike } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { networkCall } from '../../utils/networkCall'
import { useVideo } from '../../context/VideoContext'
import { useAuth } from '../../context/AuthContext'
import { usePlaylist } from '../../context/PlaylistContext';

const VideoPlaying = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [video, setVideo] = useState({})
    const { state, dispatch } = useVideo()
    const { authState, authDispatch } = useAuth()
    const { playlistState, playlistDispatch } = usePlaylist()
    const [note, setNote] = useState('')
    const videoRef = useRef()

    // console.log(authState)

    useEffect(() => {
        getVideo()
    }, [])


    const getVideo = async () => {
        const response = await networkCall(`/video/${id}`, "GET")
        if (response.status === 200) {
            setVideo(response.data.video)
        }
    }

    const getNotes = (videoID) => {
        const notes = state.notes.find(e => e.videoID === videoID)?.notes
        if (!notes) return []
        else return notes
    }

    const formatTime = () => {
        const timeInSec = videoRef.current.getCurrentTime();
        const formatedTime = new Date(timeInSec * 1000).toISOString().substr(11, 8);
        return formatedTime;
    }


    const addToNotesHandler = async (videoID) => {
        const notesInfo = { note, timeStamp: formatTime() }
        const response = await networkCall(`/notes/${videoID}`, "POST", notesInfo)
        if (response.status === 200) {
            dispatch({ type: 'SET_NOTES', payload: response.data.notes })
            setNote('')
        }
    }

    const deleteNoteHandler = async (noteID) => {
        const response = await networkCall(`/notes/${id}`, "DELETE", { noteID })
        if (response.status === 200) {
            dispatch({ type: 'SET_NOTES', payload: response.data.notes })
        }
    }


    const toggleDescription = () => {
        const descriptionBox = document.querySelector('.channel-description');
        descriptionBox.classList.toggle('--active')

        if (descriptionBox.classList.contains('--active')) {
            descriptionBox.style.maxHeight = descriptionBox.scrollHeight + 'px'
        } else {
            descriptionBox.style.maxHeight = '0px'
        }
    }

    const addToLikedVideosHandler = async () => {
        if (!authState.isLoggedIn) {
            navigate('/')
        } else {
            const playlistID = playlistState.library.find(playlist => playlist.name === 'Liked Videos')._id
            const response = await networkCall(`/playlist/${playlistID}/${id}`, "POST")
            if (response.data.success) {
                playlistDispatch({ type: 'ADD_VIDEO_TO_PLAYLIST', payload: response.data.playlist })
            } else {
                console.log('Toast----Already in liked videos')
            }
        }
    }

    const openModal = () => {
        dispatch({ type: 'SET_SHOW_MODAL', payload: id })
    }

    return (
        <div className='videoplaying'>
            {state.showModal === id && <Modal videoID={id} />}

            <div className='video-player-container'>
                <ReactPlayer url={`https://www.youtube.com/embed/${video.videoID}`}
                    ref={videoRef}
                    width='100%' height='480px' config={{
                        youtube: {
                            playerVars: { showinfo: 1 }
                        }
                    }}
                    controls
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

                <div className="channel-details">
                    <div className="title">{video.name}</div>
                    <div className="other-details">
                        <div className="views-date">
                            <span>{video.date}</span>
                            <span>{video.views} views</span>
                        </div>

                        <div className="options">
                            <button className='btn' onClick={() => { addToLikedVideosHandler(id) }}> <AiOutlineLike /></button>
                            <button className='btn' onClick={() => openModal()}> <MdPlaylistAdd /></button>
                        </div>
                    </div>

                    <div className='img-desc'>
                        <div className='channel-img'>
                            <img src={video.channelImage} alt="image" />
                            <span>{video.channelName}</span>
                        </div>
                        <button className='description-btn' onClick={() => toggleDescription()}>Description</button>
                    </div>

                    <div className='channel-description'>
                        <p>{video.description}</p>
                    </div>
                </div>

            </div>

            <div className='note-taking-container'>
                <h2>Take notes</h2>
                <div className='text-input'>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                    <IoIosAddCircleOutline className='icon' onClick={() => addToNotesHandler(id)} />
                </div>

                <div className="allNotes">
                    {getNotes(id).length > 0
                        ? getNotes(id).map((note, index) => {
                            return (
                                <div className='notes-info' key={index}>
                                    <p>{note.note}</p>
                                    <div className='notes-options'>
                                        <span>{note.timeStamp}</span>
                                        <div className='btns'>
                                            <button onClick={() => deleteNoteHandler(note._id)}><MdDelete /></button>
                                            <button> <MdEdit /></button>
                                        </div>
                                    </div>
                                </div>)
                        })

                        : <div style={{ textAlign: 'center', color: 'grey' }}>
                            {authState.isLoggedIn ? 'Your notes will appear here' : 'Login to take notes'}
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default VideoPlaying
