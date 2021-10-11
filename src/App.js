import './App.css';
import { useEffect } from "react";
import LandingPage from './pages/LandingPage/LandingPage';
import { Routes, Route } from 'react-router-dom';
import Category from './pages/Category/Category';
import SignUp from './pages/SignUp/SignUp'
import Navbar from "./components/Header/Header";
import { useMatch } from "react-router-dom";
import { displayNavbarAndSidebar } from './utils/components';
import VideoListing from './pages/VideoListing/VideoListing';
import { defaultHeaderForToken, networkCall } from './utils/networkCall'
import { useVideo } from './context/VideoContext';
import Login from './pages/Login/Login';
import VideoPlaying from './pages/VideoPlaying/VideoPlaying';
import { useAuth } from './context/AuthContext';
import { usePlaylist } from './context/PlaylistContext';
import Library from './pages/Library/Library';
import WatchLater from './pages/WatchLater/WatchLater';
import StackedList from './components/StackedList/StackedList';
import PrivateRoutes from './components/PrivateRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure()

function App() {
  const { authState } = useAuth()
  const { dispatch } = useVideo()
  const { playlistDispatch } = usePlaylist()
  const landingPageURL = useMatch('/');
  const categoryPageURL = useMatch('/category');
  defaultHeaderForToken(authState.currentUserToken)

  useEffect(() => {
    if (authState.isLoggedIn) {
      getNotes() && getPlaylist()
    }
  }, [authState.currentUserToken])


  const getPlaylist = async () => {
    const response = await networkCall('/playlist', "GET")
    if (response.status === 200) {
      playlistDispatch({ type: 'SET_LIBRARY', payload: response.data.playlists })
    }
  }

  const getNotes = async () => {
    const response = await networkCall(`/notes`, "GET")
    if (response.status === 200) {
      dispatch({ type: 'SET_NOTES', payload: response.data.notes })
    }
  }

  return (
    <div className="App">

      {displayNavbarAndSidebar(landingPageURL, categoryPageURL) && <Navbar />}

      <Routes>
        <PrivateRoutes path='watchlater' element={<WatchLater />} />
        <PrivateRoutes path='library/:playlistID' element={<StackedList />} />
        <PrivateRoutes path='library' element={<Library />} />
        <Route path='videos/:id' element={<VideoPlaying />} />
        <Route path='videos' element={<VideoListing />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='category' element={<Category />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>

    </div>
  );
}

export default App;
