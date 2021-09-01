import { createContext, useContext, useReducer } from "react";
import { updateChangesInPlaylist } from "../arrayManipulation";

const PlaylistContext = createContext()

const initialState = {
    library: []
}

const playlistReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIBRARY': return { ...state, library: action.payload }

        case 'ADD_VIDEO_TO_PLAYLIST': return { ...state, library: updateChangesInPlaylist(state.library, action.payload) }

        case 'DELETE_VIDEO_FROM_PLAYLIST': return { ...state, library: updateChangesInPlaylist(state.library, action.payload) }

        case 'ADD_NEW_PLAYLIST': return { ...state, library: [...state.library, action.payload] }

        case 'DELETE_PLAYLIST': return { ...state, library: state.library.filter(playlist => playlist._id !== action.payload) }

        default: return { ...state }
    }
}

const PlaylistProvider = ({ children }) => {
    const [playlistState, playlistDispatch] = useReducer(playlistReducer, initialState)
    return (
        <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>
            {children}
        </PlaylistContext.Provider>
    )

}

const usePlaylist = () => useContext(PlaylistContext)

export { usePlaylist, PlaylistProvider }