import React, { useState, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from 'react-owl-carousel';
import axios from "axios";
import './topic.css'
import { Link } from 'react-router-dom';

const options = {
    items: 5,
    margin: 30,
    loop: true,
    nav: false,
    dots: false,
};

export const Topic = ({ topic }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/topics/playlist/${topic.id}`);
                setPlaylists(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [topic.id]);

    return (
        <div className="topic">
            <div className="topic-wrapper">
                <div className="topic-title">
                    <h2>{topic.title}</h2>
                </div>
                <div className="topic-content">
                    <OwlCarousel className="owl-theme" {...options}>
                        {playlists.map((playlist) => (
                            <div className="item" key={playlist.id}>
                                <Link to={`/playlist/${playlist.id}`}>
                                    <div className="card-song">
                                        <div className="card-song-img">
                                            <img src={playlist.thumbnail} alt="{playlist.title}" />
                                        </div>
                                        <div className="card-song-info">
                                            <div className="struncate card-song-name">{playlist.title}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
};
