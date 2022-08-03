import React, { useState, useRef, useEffect } from "react";
import "../Modal/Modal.css";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useVideo } from "../../context/VideoContext";
import { usePlaylist } from "../../context/PlaylistContext";
import { networkCall } from "../../utils/networkCall";
import callToastify from "../Toast/toast";

const Modal = (props) => {
  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);
  const { dispatch } = useVideo();
  const { playlistState, playlistDispatch } = usePlaylist();
  const [playlistName, setPlaylistName] = useState("");
  const textInputRef = useRef();

  // console.log(playlistState)

  useEffect(() => {
    textInputRef.current?.focus();
  }, [createNewPlaylist]);

  const expandModalHandler = () => {
    setCreateNewPlaylist(true);
  };

  const closeModal = () => {
    setCreateNewPlaylist(false);
    dispatch({ type: "SET_SHOW_MODAL", payload: "" });
  };

  const checkboxChanheHandler = async (playlistID) => {
    if (checkVideoInPlaylist(props.videoID, playlistID)) {
      const response = await networkCall(
        `/playlist/${playlistID}/${props.videoID}`,
        "DELETE"
      );
      if (response.status === 200) {
        playlistDispatch({
          type: "DELETE_VIDEO_FROM_PLAYLIST",
          payload: response.data.playlist,
        });
        callToastify("Deleted video from playlist", true);
      }
    } else {
      const repsonse = await networkCall(
        `/playlist/${playlistID}/${props.videoID}`,
        "POST"
      );
      if (repsonse.data.success) {
        playlistDispatch({
          type: "ADD_VIDEO_TO_PLAYLIST",
          payload: repsonse.data.playlist,
        });
        callToastify("Video added to playlist", true);
      }
    }
  };

  const checkVideoInPlaylist = (videoID, playlistID) => {
    const currentPlaylist = playlistState.library.find(
      (playlist) => playlist._id === playlistID
    );
    const allVideoIDs = currentPlaylist.videos.map((video) => video._id);
    const check = allVideoIDs.includes(videoID);
    return check;
  };

  const createPlaylistHandler = async () => {
    setPlaylistName("");
    const response = await networkCall(`/playlist/${props.videoID}`, "POST", {
      name: playlistName,
    });
    if (response.status === 200) {
      playlistDispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: response.data.playlist,
      });
      dispatch({ type: "SET_SHOW_MODAL", payload: "" });
      callToastify("Video added to playlist", true);
    }
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <IoMdClose className="close-btn" onClick={() => closeModal()} />
        <div className="playlists-container">
          <div className="title">
            <h2>Playlists</h2>
          </div>
          <div className="all-playlist">
            {playlistState.library.map((playlist) => {
              return (
                <div className="playlist" key={playlist._id}>
                  <input
                    type="checkbox"
                    checked={checkVideoInPlaylist(props.videoID, playlist._id)}
                    onChange={() => checkboxChanheHandler(playlist._id)}
                  />
                  <label>{playlist.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="create-playlist-container">
          {createNewPlaylist ? (
            <>
              <div className="playlist-name-input">
                <input
                  type="text"
                  placeholder="Name of playlist"
                  ref={textInputRef}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  value={playlistName}
                />
              </div>
              <div className="playlist-create-btn">
                <button
                  disabled={playlistName.length === 0 && "disabled"}
                  onClick={() => createPlaylistHandler()}
                >
                  Create
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="create-playlist-btn"
                onClick={() => expandModalHandler()}
              >
                <AiOutlinePlus /> Create playlist
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
