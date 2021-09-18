import React from 'react'
import '../Library/Library.css'
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard'
import { usePlaylist } from '../../context/PlaylistContext'
import Sidebar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'

const Library = () => {
    const { playlistState } = usePlaylist()

    return (
        <div className='library'>
            <Sidebar />
            <div className="library-container">
                <h2>Playlists</h2>
                <div className="library-grid-container">
                    {playlistState.library.map(playlist => {
                        if (playlist.name !== 'Watch Later') {
                            return (
                                <Link to={`/library/${playlist._id}`} key={playlist._id}>
                                    <PlaylistCard playlist={playlist} />
                                </Link>
                            )
                        }
                    })}
                </div>
            </div>

        </div>
    )
}

export default Library
