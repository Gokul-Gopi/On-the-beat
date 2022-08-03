import React from "react";
import { useParams } from "react-router";
import { usePlaylist } from "../../context/PlaylistContext";
import { findPlaylistVideos } from "../../arrayManipulation";
import Sidebar from "../Navbar/Navbar";
import "../StackedList/StackedList.css";
import HorizontalCard from "./HorizontalCard";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

const StackedList = () => {
  const { playlistID } = useParams();
  const { playlistState } = usePlaylist();

  const playlist = findPlaylistVideos(playlistState.library, playlistID);

  return (
    <div className="stacked-list">
      <Sidebar />

      <div className="list-of-videos">
        <div className="stacked-list-details">
          <h2 className="list-name">{playlist?.name}</h2>
        </div>
        {playlist?.videos?.length !== 0 &&
          playlist?.videos?.map(({ video, _id }) => {
            return (
              <Link to={`/videos/${_id}`} key={_id}>
                <HorizontalCard playlistID={playlistID} video={video} />
              </Link>
            );
          })}
        {/* <div className='list-options'>
                    <button><RiDeleteBin6Line /> Delete playlist</button>
                    <button><FiEdit3 /> Rename playlist</button>
                </div> */}
      </div>
    </div>
  );
};

export default StackedList;
