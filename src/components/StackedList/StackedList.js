import React, { useState } from 'react'
import { useParams } from 'react-router'
import { usePlaylist } from '../../context/PlaylistContext'
import { findPlaylistVideos } from '../../arrayManipulation'
import Sidebar from '../Navbar/Navbar'
import '../StackedList/StackedList.css'
import HorizontalCard from './HorizontalCard'
import { Link } from 'react-router-dom'

const StackedList = (props) => {
    const { playlistID } = useParams()
    const { playlistState, playlistDispatch } = usePlaylist()
    const [currentPlaylist, setCurrentPlaylist] = useState({})

    console.log(playlistID)

    return (
        <div className='stacked-list'>
            <Sidebar />

            <div className='list-of-videos'>
                {findPlaylistVideos(playlistState.library, playlistID)?.length !== 0
                    && findPlaylistVideos(playlistState.library, playlistID)?.map(({ video, _id }) => {
                        return (
                            <Link to={`/videos/${_id}`} key={_id}>
                                <HorizontalCard playlistID={playlistID} video={video} />
                            </Link>
                        )

                    })
                }
            </div>


        </div>
    )
}

export default StackedList
