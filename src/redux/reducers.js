import {SET_PLAYLIST, SET_CURRENT_SONG_INDEX, SET_IS_PLAYING, SET_SONG_PLAYING, SET_ID_PLAYLIST} from './actions';
const initialState = {
    playlist: [],
    currentSongIndex: -1,
    idPlaylist: 'a',
    isPlaying: true,
    songPlaying: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYLIST:
            return {
                ...state,
                playlist: action.payload
            };
        case SET_CURRENT_SONG_INDEX:
            return {
                ...state,
                currentSongIndex: action.payload
            };
        case SET_IS_PLAYING:
            return {
                ...state,
                isPlaying: action.payload
            };
        case SET_SONG_PLAYING:
            return {
                ...state,
                songPlaying: action.payload
            };
        case SET_ID_PLAYLIST:
            return {
                ...state,
                idPlaylist: action.payload
            };

        default:
            return state;
    }
};

export default reducer;
