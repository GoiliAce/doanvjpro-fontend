import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../playlists/Playlist.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import { useDispatch } from 'react-redux';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions';
import { useSelector } from 'react-redux';
import API_BASE_URL from '../../config';
export const Album = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const currentSongIndex = useSelector((state) => state.currentSongIndex);
    const isPlaying = useSelector((state) => state.isPlaying);
    const currentIdPlaylist = useSelector((state) => state.idPlaylist);
    const [playlist, setPlaylist] = useState([]);
    const [songs, setSongs] = useState([]);
    const accountLogin = useSelector((state) => state.accountLogin);
    const currentSongID = useSelector((state) => state.currentSong);
    useEffect(() => {
        if(localStorage.getItem('access_token') && accountLogin.isLogin){
            axios(
                {
                    method:'get',
                url: API_BASE_URL + 'user/album/' + id,
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
                }
            )
                .then(response => {
                    setPlaylist(response.data);
                    setSongs(response.data.songs);
                })
    
                .catch(error => console.log(error));
        }
        else{
            axios(
                {
                    method:'get',
                url: API_BASE_URL + 'album/' + id,
                }
            )
                .then(response => {
                    setPlaylist(response.data);
                    setSongs(response.data.songs);
                })
    
                .catch(error => console.log(error));
        }
    }, [accountLogin.isLogin]);

    const handleSongClick = (index, songs) => {
        dispatch(setCurrentPlaylist(songs));
        dispatch(setCurrentIdPlaylist(playlist.id));
        dispatch(setCurrentSongIndex(index));
    };
    const handleAddSongFavorite = (song) => {
        
        if (accountLogin.isLogin) {
            axios({
                method: 'put',
                url: API_BASE_URL + 'user/add-song-user',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                data: {
                    songId: song.id,
                    islike: !song.islike
                }
            }).then(()=>{
                song.islike = !song.islike;
                setSongs([...songs]);                
            })
        }
    }
    return (

        <div className="" id="content">
            <Navbar content={playlist.title} />
            <div>
                <div className="info">
                    <div className="image-play-list">
                        <img src={playlist.thumbnail} alt="" />
                    </div>
                    <div className="info__playlist">
                        <div className="name-play-list">
                            <h1>{playlist.title}</h1>
                        </div>
                        <div className="description">
                            <p>{playlist.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='wrapper-songs'>
                <ul className='list-songs'>
                    <li className='song-item'>
                        <div className='song-item__id'>#</div>
                        <div className='song-item__title'>Title</div>
                        <div className='song-item__author'>Artists</div>
                        <div className='song-item__durations'>Durations</div>
                    </li>
                    {
                        songs.map((song, index) => {
                            return (
                                <li className={`song-item ${currentSongID==song.id? 'song-activate':'' }`} >
                                    <div className={`song-item__id ${currentSongID==song.id? 'spin':''}`} onClick={() => handleSongClick(index, songs)}>{index + 1}</div>
                                    <div className='song-item__title'>{song.title}</div>
                                    <div className='song-item__author struncate'>
                                        {
                                            song.artists.map((artist, idx) => {
                                                return (
                                                    <span key={artist.id}>
                                                        <Link className={`link ${currentSongID==song.id? 'song-activate':''}`} to={`/artist/${artist.alias}`}>{artist.name}</Link>
                                                        {idx !== song.artists.length - 1 && ', '}
                                                    </span>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                    <div className='song-item__durations'>
                                        <div className="add_favorite" onClick={()=>handleAddSongFavorite(song) } key={index}>
                                            <i className={`${song.islike? 'active fas':'far'} fa-heart`} ></i>
                                            <div className="tooltip">
                                                <span>{song.islike? 'Remove favorite':'Add to favorite'}</span>
                                            </div>
                                        </div>
                                        <div className="duration">{new Date(song.duration * 1000).toISOString().substr(14, 5)}</div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
