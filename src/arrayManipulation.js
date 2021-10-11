const updateChangesInPlaylist = (library, playlist) => {
    return library.map(plist => {
        if (plist._id === playlist._id) {
            return playlist
        }
        return plist
    })
}

const findPlaylistVideos = (library, playlistID) => {
    const playlist = library.find(playlist => playlist?._id === playlistID)
    return { name: playlist?.name, videos: playlist?.videos }
}


export { updateChangesInPlaylist, findPlaylistVideos }
