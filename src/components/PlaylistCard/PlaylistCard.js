import React from 'react'
import '../PlaylistCard/PlaylistCard.css'
import { RiPlayList2Fill } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin4Line } from 'react-icons/ri'
import { networkCall } from '../../utils/networkCall'
import { usePlaylist } from '../../context/PlaylistContext'

const PlaylistCard = ({ playlist }) => {

    const { playlistState, playlistDispatch } = usePlaylist()

    const editPlaylistName = async (event) => {
        event.preventDefault();
        // const response = await networkCall(`/playlist/${playlist._id}`, "DELETE");
        // console.log(response);
    }

    const deletePlaylist = async (event) => {
        event.preventDefault();
        const response = await networkCall(`/playlist/${playlist._id}`, "DELETE");

        if (response.status === 200) {
            playlistDispatch({ type: 'DELETE_PLAYLIST', payload: response.data.removedPlaylistID });
        }
    }

    const thumbnail = playlist.videos[0]?.video ? playlist.videos[0]?.video?.videoID : 'https://t3.ftcdn.net/jpg/03/26/62/70/360_F_326627033_QKJSmAnbPCowSGy0JiVLHVbuJ92tQrTg.jpg'

    return (
        <div className='playlist-card'>
            <div className='playlist-info'>
                <div className='playlist-image'>
                    <img src={`https://i.ytimg.com/vi/${thumbnail}/mqdefault.jpg`} alt="playlist image" />
                </div>

                <div className='playlist-details'>
                    <div>
                        <span>{playlist.videos.length}</span>
                        <span><RiPlayList2Fill /></span>
                    </div>
                </div>
            </div>

            <div className="playlist-options">
                <span className='playlist-name'>{playlist.name}</span>
                {/* <div className='btns'>
                    <button onClick={(e) => editPlaylistName(e, playlist._id)}><AiOutlineEdit /></button>
                    <button onClick={(e) => deletePlaylist(e, playlist._id,)}><RiDeleteBin4Line /></button>
                </div> */}
            </div>
        </div>
    )
}

export default PlaylistCard
