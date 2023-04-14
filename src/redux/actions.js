export const SET_PLAYLIST = 'SET_PLAYLIST';
export const SET_CURRENT_SONG_INDEX = 'SET_CURRENT_SONG_INDEX';
export const SET_IS_PLAYING = 'SET_IS_PLAYING';
export const SET_SONG_PLAYING = 'SET_SONG_PLAYING';
export const SET_ID_PLAYLIST = 'SET_ID_PLAYLIST';
export const setCurrentPlaylist = (playlist) => {
    return {
        type: SET_PLAYLIST,
        payload: playlist
    }
};

export const setCurrentSongIndex = (index) => {
    return {
        type: SET_CURRENT_SONG_INDEX,
        payload: index
    }
}

export const setIsPlaying = (isPlaying) => {
    return {
        type: SET_IS_PLAYING,
        payload: isPlaying
    }
};

export const setSongPlaying = (song) => {
    return {
        type: SET_SONG_PLAYING,
        payload: song
    }
};

export const setCurrentIdPlaylist = (id) => {
    return {
        type: SET_ID_PLAYLIST,
        payload: id
    }
}
