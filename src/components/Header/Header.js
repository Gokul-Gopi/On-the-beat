import React, { useRef, useState } from "react";
import "./Header.css";
import { GiGuitarBassHead } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useVideo } from "../../context/VideoContext";
import callToastify from "../Toast/toast";

const Navbar = () => {
  const { authState, authDispatch } = useAuth();
  const { state } = useVideo();
  const navigate = useNavigate();
  const inputRef = useRef("");
  const [searchSuggestion, setSearchSuggestion] = useState({
    suggestionBox: false,
    list: [],
  });

  const onClickHandler = () => {
    if (authState.isLoggedIn) {
      localStorage.removeItem("userDetails");
      authDispatch({ type: "RESET_USER" });
      navigate("/videos");
      window.location.reload();
      callToastify("Logged out", true);
    } else {
      navigate("/login");
    }
  };

  const searchVideos = (searchInput) => {
    if (searchInput.length !== 0) {
      const searchResults = state.video.filter((video) => {
        return video.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setSearchSuggestion({ suggestionBox: true, list: searchResults });
    } else {
      setSearchSuggestion({ suggestionBox: false, list: [] });
    }
  };

  const navigateToVideo = (id) => {
    inputRef.current.value = "";
    navigate(`/videos/${id}`);
    setSearchSuggestion({ suggestionBox: false, list: [] });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="header">
        <GiGuitarBassHead className="header-icon" />
        <h2>On the beat!</h2>
      </Link>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Search in category"
          ref={inputRef}
          onChange={(e) => searchVideos(e.target.value)}
        />
        {searchSuggestion.suggestionBox ? (
          <div className="search-suggestions">
            {searchSuggestion.list.map((item) => {
              return (
                <span
                  className="list-item"
                  onClick={() => navigateToVideo(item._id)}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="user-name">
        <FaUserCircle className="user-icon" onClick={() => onClickHandler()} />
        {authState.isLoggedIn ? <span>Logout</span> : <span>Login</span>}
      </div>
    </nav>
  );
};

export default Navbar;
