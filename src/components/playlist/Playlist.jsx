import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Playlist.css'
import { Navbar } from '../navbar/Navbar';
import { ListSong } from './ListSong';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { HandleSongClickContext } from "../../App";
import API_BASE_URL from '../../config';
export const Playlist = () => {
    const { id } = useParams();
    const handleSongClick = useContext(HandleSongClickContext);
    
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        axios.get(API_BASE_URL+'/playlists/' + id)
            .then(response => setPlaylist(response.data))
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
        <ListSong playlist={id} handleSongClick={handleSongClick}/>
        </div>

    );
}
