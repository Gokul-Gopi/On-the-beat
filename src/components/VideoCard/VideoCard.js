import React from 'react'
import '../VideoCard/VideoCard.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useVideo } from '../../context/VideoContext'
import Option from './Option'

const VideoCard = (props) => {
    const { state, dispatch } = useVideo()

    const handlerMoreOptions = (event) => {
        event.preventDefault()
        if (state.showOptions === props.id)
            dispatch({ type: 'SET_SHOW_OPTIONS', payload: '' })
        else
            dispatch({ type: 'SET_SHOW_OPTIONS', payload: props.id })

    }

    return (
        <div className='video-card'>
            <div className='video-card-container'>
                <div className='card-img'>
                    <img src={`https://i.ytimg.com/vi/${props.videoID}/mqdefault.jpg`} alt="video-thumbnail" />
                </div>
                <div className="primary-details">
                    <img src={props.channelImage} alt="channel" />
                    <span className='name-of-video'>{props.name}</span>
                    <button className='btn' onClick={(e) => handlerMoreOptions(e)} > <BsThreeDotsVertical /></button>
                </div>

                <div className="secondary-details">
                    <span className='channel-name'>{props.channelName}</span>
                    <span className='views'>{props.views} views</span>
                </div>

                {state.showOptions === props.id && <Option videoID={props.id} />}

            </div>
        </div>
    )
}

export default VideoCard
