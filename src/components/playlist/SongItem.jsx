import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './SongItem.css'

export const SongItem = ({ song,index,handleClick }) => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/songs/artist/${song.id}`);
                setArtists(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchArtists();
    }, [song.id]);

    return (
        <li className='song-item' onClick={handleClick}>
            <div className='song-item__id'>{index + 1}</div>
            <div className='song-item__title'>{song.title}</div>
            <div className='song-item__author'>
                {
                    artists.map((artist, index) => {
                        return (
                            <span key={artist.id}>
                                <Link className='link'  to={`/artist/${artist.id}`}>{artist.name}</Link>
                                {index !== artists.length - 1 && ', '} 
                            </span>
                        )
                    }
                    )}
            </div>
            <div className='song-item__durations'>{}</div>
        </li>
    );

}
