import React, { useState, useEffect } from 'react';
import axios from "axios";
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
    useEffect(() => {
        axios.get(API_BASE_URL + 'album/' + id)
            .then(response => {
                setPlaylist(response.data);
                setSongs(response.data.songs);
            })

            .catch(error => console.log(error));
    }, []);

    const handleSongClick = (index,songs) => {
        dispatch(setCurrentPlaylist(songs));
        dispatch(setCurrentIdPlaylist(playlist.id));
        dispatch(setCurrentSongIndex(index));
    };
    return (

        <div className="" id="content">
            <Navbar content={playlist.title} />
            <div className="wrapper-top">
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
                        <div className="description">
                            <p>Like: {playlist.like}</p>
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
                                <li className={`song-item ${currentIdPlaylist=='a'? (index===currentSongIndex ? 'song-activate':''):(currentIdPlaylist===playlist.id&&index===currentSongIndex)?'song-activate':''}` } >
                                    <div className={`song-item__id ${currentIdPlaylist=='a'? (index===currentSongIndex ? 'spin':''):(currentIdPlaylist===playlist.id&&index===currentSongIndex)?'spin':''}`} onClick={() => handleSongClick(index,songs)}>{index + 1}</div>
                                    <div className='song-item__title'>{song.title}</div>
                                    <div className='song-item__author struncate'>
                                        {
                                            song.artists.map((artist, idx) => {
                                                return (
                                                    <span key={artist.id}>
                                                        <Link className={`link ${currentIdPlaylist=='a'? (index===currentSongIndex ? 'song-activate':''):(currentIdPlaylist===playlist.id&&index===currentSongIndex)?'song-activate':''}` } to={`/artist/${artist.alias}`}>{artist.name}</Link>
                                                        {idx !== song.artists.length - 1 && ', '}
                                                    </span>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                    <div className='song-item__durations'>{new Date(song.duration * 1000).toISOString().substr(14, 5)}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
