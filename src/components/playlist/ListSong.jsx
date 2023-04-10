import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ListSong.css'
import { useParams } from 'react-router-dom';
import { SongItem } from './SongItem';
import API_BASE_URL from '../../config';
export const ListSong = ({playlist, handleSongClick}) => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await axios.get(API_BASE_URL+`/playlists/songs/${playlist}`);
                setSongs(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSongs();
    }, [playlist]);
    return (
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
                            <SongItem   
                                key={song.id} 
                                song={song} 
                                index={index} 
                                handleClick={ () => handleSongClick({songs, index})}
                            />
                        )
                    })
                }
            </ul>
        </div>
    );
}
