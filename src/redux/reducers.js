import {SET_PLAYLIST, 
        SET_CURRENT_SONG_INDEX, 
        SET_IS_PLAYING, 
        SET_SONG_PLAYING, 
        SET_ID_PLAYLIST, 
        SET_ACCOUNT_LOGIN, 
        SET_SHOW_LOGIN_FORM, 
        SET_SHOW_SETTING_FORM,
        SET_CURRENT_LISTENING_SONG_LIST,
        SET_CURRENT_SONG} from './actions';
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
    accessToken: '',
    currentListeningSongList: JSON.parse(localStorage.getItem('currentListeningSongList')) || [],
    currentSong: ''
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
        case SET_CURRENT_LISTENING_SONG_LIST:
            const newSongs = [...state.currentListeningSongList, action.payload];
            if (newSongs.length > 5) {
                newSongs.shift();
            }
            // remove null item
            // nếu đã tồn tại thì xóa cái cũ đi, thêm cái mới vào
            for (let i = 0; i < newSongs.length; i++) {
                if (newSongs[i] == null) {
                    newSongs.splice(i, 1);
                }
                for(let j = i + 1; j < newSongs.length; j++) {
                    if (newSongs[i].id === newSongs[j].id) {
                        newSongs.splice(i, 1);
                    }
                }
            }
            localStorage.setItem('currentListeningSongList', JSON.stringify(newSongs));
            return {
                ...state,
                currentListeningSongList: newSongs
            };
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
