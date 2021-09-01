import { createContext, useContext, useReducer } from "react";

const VideoContext = createContext();

const initialState = {
    video: [],
    categories: [],
    currentCategory: '',
    notes: [],
    showModal: '',
    showOptions: '',
    loading: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_VIDEOS": return { ...state, video: action.payload }

        case "SET_CATEGORIES": return { ...state, categories: action.payload }

        case "SET_CURRENT_CATEGORY": return { ...state, currentCategory: action.payload }

        case 'SET_NOTES': return { ...state, notes: action.payload }

        case 'SET_SHOW_MODAL': return { ...state, showModal: action.payload }

        case 'SET_SHOW_OPTIONS': return { ...state, showOptions: action.payload }

        case "SET_LOADING": return { ...state, loading: !state.loading }

        default: return { ...state }

    }
}

const VideoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <VideoContext.Provider value={{ state, dispatch }}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideo = () => useContext(VideoContext)

export { VideoProvider, useVideo }