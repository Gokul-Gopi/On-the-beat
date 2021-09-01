import React from 'react'
import { usePlaylist } from '../../context/PlaylistContext'
import { networkCall } from '../../utils/networkCall'
import '../StackedList/HorizontalCard.css'

const HorizontalCard = ({ video, playlistID }) => {

    const { playlistState, playlistDispatch } = usePlaylist()


    const removeVideoFromPlaylist = async (event) => {
        event.preventDefault()
        const response = await networkCall(`/playlist/${playlistID}/${video._id}`, "DELETE")

        if (response.status === 200) {
            playlistDispatch({ type: 'DELETE_VIDEO_FROM_PLAYLIST', payload: response.data.playlist })
        }
    }
    return (
        <div className='horizontal-card'>
            <div className="video-thumbnail">
                <img src={`https://i.ytimg.com/vi/${video.videoID}/mqdefault.jpg`} alt="Image" />
            </div>
            <div className="video-info">
                <div className="info">
                    <span className='title'>{video.name}</span>
                    <span className='chanel'>{video.channelName}</span>
                    {/* <span className='length'>video length</span> */}
                </div>

                <button className="remove-video-btn" onClick={(e) => removeVideoFromPlaylist(e)}>Remove</button>
            </div>
        </div>
    )
}

export default HorizontalCard
