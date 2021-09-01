const updateChangesInPlaylist = (library, playlist) => {
    return library.map(plist => {
        if (plist._id === playlist._id) {
            return playlist
        }
        return plist
    })
}

const deleteVideoFromPlaylist = (library, playlist) => {
    return library.map(plist => {
        if (plist._id === playlist._id) {
            return playlist
        }
        return plist
    })
}

const findPlaylistVideos = (library, playlistID) => {
    return library.find(playlist => playlist?._id === playlistID)?.videos
}


export { updateChangesInPlaylist, findPlaylistVideos }
