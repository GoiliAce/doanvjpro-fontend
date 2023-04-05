import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Playlist.css'
import { ListSong } from './ListSong';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { HandleSongClickContext } from "../../App";

export const Playlist = () => {
    const { id } = useParams();
    const handleSongClick = useContext(HandleSongClickContext);
    
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/playlists/' + id)
            .then(response => setPlaylist(response.data))
            .catch(error => console.log(error));
    }, []);
    return (
        <div className="col-md-10 no-padding" id="content">
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
