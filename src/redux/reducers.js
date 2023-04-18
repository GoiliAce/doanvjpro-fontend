import {SET_PLAYLIST, SET_CURRENT_SONG_INDEX, SET_IS_PLAYING, SET_SONG_PLAYING, SET_ID_PLAYLIST, SET_ACCOUNT_LOGIN, SET_SHOW_LOGIN_FORM, SET_SHOW_SETTING_FORM} from './actions';
const initialState = {
    playlist: [],
    currentSongIndex: -1,
    idPlaylist: 'a',
    isPlaying: true,
    songPlaying: {},
    accountLogin: {
        username: '',
        password: '',
        thumbnail: '',
        isLogin: false
    },
    showLoginForm: false,
    accessToken: ''
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
        case SET_ACCOUNT_LOGIN:
            return {
                ...state,
                accountLogin: action.payload
            };
        case SET_SHOW_LOGIN_FORM:
            return {
                ...state,
                showLoginForm: action.payload
            };
        case SET_SHOW_SETTING_FORM:
            return {
                ...state,
                showSettingForm: action.payload
            };

        default:
            return state;
    }
};

export default reducer;
