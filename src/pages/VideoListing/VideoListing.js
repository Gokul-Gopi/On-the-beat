import React, { useEffect } from 'react'
import '../VideoListing/VideoListing.css'
import VideoCard from '../../components/VideoCard/VideoCard'
import { useVideo } from '../../context/VideoContext'
import { networkCall } from '../../utils/networkCall'
import Sidebar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'

const VideoListing = () => {
    const { state, dispatch } = useVideo();

    useEffect(() => {
        let category = localStorage.getItem('Category')
        const getVideos = async () => {
            const response = await networkCall(`/category/${category}`, 'GET')
            if (response.status === 200) {
                dispatch({ type: 'SET_VIDEOS', payload: response.data.videos })
            }
        }
        getVideos()

    }, [])


    return (
        <div className='video-listing'>
            <Sidebar />

            <div className='video-listing-container'>
                {state.video.map((video) => {
                    return (
                        <div key={video._id}>
                            <Link to={`/videos/${video._id}`} >
                                <VideoCard id={video._id} videoID={video.videoID} name={video.name} date={video.date} views={video.views} channelName={video.channelName} channelImage={video.channelImage} />
                            </Link>
                            {state.showModal === video._id && <Modal videoID={video._id} />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default VideoListing
