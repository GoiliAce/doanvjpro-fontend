import React, { useState, useEffect } from "react";
import { Navbar } from "../navbar/Navbar";
import axios from "axios";
import API_BASE_URL from "../../config";
import Loading from "../../assets/gif/Loading-cat.gif";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import "./Playlists.css";


const options = {
    items: 5,
    margin: 30,
    loop: true,
    nav: false,
    dots: false,
};

export const Playlists = (props) => {
    const [topics, setTopics] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + "playlists");
                setTopics(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="" id="content">
            
            <div className="content_home">
                <Navbar />
                <div className="list-song p-4">
                    {topics.length === 0 ? (
                        <div className="loading text-center">
                            <img src={Loading} alt="loading" />
                            <h1 className="display-4">
                                Trang đang load bạn vui lòng đợi xíu nha
                            </h1>
                        </div>
                    ) : (
                        topics.map((topic) => {
                            return (
                                <div className="topic">
                                    <div className="topic-wrapper">
                                        <div className="topic-title">
                                            <h2>{topic.title}</h2>
                                        </div>
                                    
                                        <div className="topic-content">
                                            <OwlCarousel className="owl-theme" {...options}>
                                            {
                                                topic["playlists"].map((playlist) => {
                                                    
                                                    return (
                                                        
                                                        <div className="item" key={playlist.id}>
                                                        <Link to={`/${"playlist"}/${playlist.id}`}>
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
                                                    )
                                                })
                                            }
                                            </OwlCarousel>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};