import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Playlist.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { HandleSongClickContext } from "../../App";
import API_BASE_URL from '../../config';
export const Playlist = () => {
    const { id } = useParams();
    const handleSongClick = useContext(HandleSongClickContext);

    const [playlist, setPlaylist] = useState([]);
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        axios.get(API_BASE_URL + '/playlist/' + id)
            .then(response => {
                setPlaylist(response.data);
                setSongs(response.data.songs);
            })
            
            .catch(error => console.log(error));
    }, []);

    return (

        <div className="" id="content">
            {/* <Navbar /> */}
            <div className="wrapper-top">
                <div className="info-play-list">
                    <div className="image-play-list">
                        <img src={playlist.thumbnail} alt="" />
                    </div>
                    <div className="info">
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
                                <li className='song-item' onClick={() => handleSongClick({songs, index})}>
                                    <div className='song-item__id'>{index + 1}</div>
                                    <div className='song-item__title'>{song.title}</div>
                                    <div className='song-item__author'>
                                        {
                                            song.artists.map((artist, index) => {
                                                return (
                                                    <span key={artist.id}>
                                                        <Link className='link' to={`/artist/${artist.id}`}>{artist.name}</Link>
                                                        {index !== song.artists.length - 1 && ', '}
                                                    </span>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                    <div className='song-item__durations'>{ new Date(song.duration * 1000).toISOString().substr(14, 5) }</div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>

    );
}
