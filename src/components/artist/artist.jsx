import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ContentArtist } from './contentArtist';
import './artist.css'
import API_BASE_URL from '../../config';
import cover from '../../assets/cover/default_cover.png';

export const Artist = () => {
    const { alias } = useParams();

    const [artist, setArtist] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get(API_BASE_URL + 'artist/' + alias)
            .then(response => {
                setArtist(response.data);
                setSongs(response.data.songs);
            })

            .catch(error => console.log(error));
    }, [alias]);
    return (
        <div className="artist-wrapper" id='content'>
            <div className="wrapper-top">
                <div className="info no-padding">
                    <div class="thumbnail-artist">
                        <img src={cover} alt="" />
                    </div>
                    <div className="info__artist">
                        <div className="image-artist">
                            <img src={artist.thumbnail} alt="" />
                        </div>
                        <div className="artist-name">
                            <h1>{artist.name}</h1>
                            <div className="artist-follow">
                                <p>Follow: {artist.follow} </p>
                                <box-icon name='heart' color='#ff0e0e' ></box-icon>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           <ContentArtist songs={songs} artist={artist} />
        </div>
    )
}
