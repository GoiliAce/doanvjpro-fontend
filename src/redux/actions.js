export const SET_PLAYLIST = 'SET_PLAYLIST';
export const SET_CURRENT_SONG_INDEX = 'SET_CURRENT_SONG_INDEX';
export const SET_IS_PLAYING = 'SET_IS_PLAYING';
export const SET_SONG_PLAYING = 'SET_SONG_PLAYING';
export const SET_ID_PLAYLIST = 'SET_ID_PLAYLIST';
export const SET_ACCOUNT_LOGIN = 'SET_ACCOUNT_LOGIN';
export const SET_SHOW_LOGIN_FORM = 'SET_SHOW_LOGIN_FORM';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_SHOW_SETTING_FORM = 'SET_SHOW_SETTING_FORM';
export const SET_CURRENT_LISTENING_SONG_LIST = 'CURRENT_LISTENING_SONG_LIST';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
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
export const setAccountLogin = (account) => {
    return {
        type: SET_ACCOUNT_LOGIN,
        payload: account
    }
}
export const setShowLoginForm = (isShow) => {
    return {
        type: SET_SHOW_LOGIN_FORM,
        payload: isShow
    }
}
export const setShowSettingForm = (isShow) => {
    return {
        type: SET_SHOW_SETTING_FORM,
        payload: isShow
    }
}
export const setCurrentListeningSongList = (songList) => {
    return {
        type: SET_CURRENT_LISTENING_SONG_LIST,
        payload: songList
    }
}
export const setCurrentSongID = (song) => {
    return {
        type: SET_CURRENT_SONG,
        payload: song
    }
}
