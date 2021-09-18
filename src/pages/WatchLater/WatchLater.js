import React from 'react'
import Sidebar from '../../components/Navbar/Navbar'
import HorizontalCard from '../../components/StackedList/HorizontalCard'
import { usePlaylist } from '../../context/PlaylistContext'
import '../../pages/WatchLater/WatchLater.css'

const WatchLater = () => {
    const { playlistState } = usePlaylist()

    const getWatchLater = () => {
        const playlist = playlistState.library.find(playlist => playlist.name === 'Watch Later')
        return { _id: playlist._id, videos: playlist.videos }
    }

    return (
        <div className='watch-later'>
            <Sidebar />
            <div className="watch-later-container">
                {getWatchLater()?.length !== 0
                    ? <>
                        <h2>Watch Later</h2>
                        <div className='watch-later-list'>
                            {getWatchLater().videos.map(({ video }) => {
                                return <HorizontalCard video={video} playlistID={getWatchLater()._id} key={video.videoID} />
                            })}
                        </div>
                    </>
                    : <>
                        <div>No videos to show</div>
                    </>
                }

            </div>
        </div>
    )
}

export default WatchLater
