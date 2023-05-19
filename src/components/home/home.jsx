import React, { useState, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import axios from "axios";
import API_BASE_URL from '../../config';
import Loading from '../../assets/gif/Loading-cat.gif';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from 'react-owl-carousel';
import './home.css';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions';
import { useSelector } from 'react-redux';
export const Home = () => {
    const [topics, setTopics] = useState([]);
    const [userfavorite, setUserfavorite] = useState([]);
    const dispatch = useDispatch();
    const accountLogin = useSelector((state) => state.accountLogin);
    const [albumsForYou, setAlbumsForYou] = useState([]);

    const options = {
        items: 10,
        margin: 30,
        loop: true,
        nav: false,
        dots: false,
    };
    useEffect(() => {
        if (localStorage.getItem('access_token') && accountLogin.isLogin) {
            axios(
                {
                    method: 'get',
                    url: API_BASE_URL + 'user/recommend/',
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                }
            )
                .then(response => {
                    setUserfavorite(response.data);
                    console.log("hihi", response.data);

                })
                .catch(error => console.log(error));

            axios(
                {
                    method: 'get',
                    url: API_BASE_URL + 'user/recommend/album',
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                }
            ).then(response => {
                setAlbumsForYou(response.data);
                console.log("hihi1", response.data);
            })
                .catch(error => console.log(error));
        }
        else {
            setUserfavorite([]);
            setAlbumsForYou([]);
        }
    }, [accountLogin.isLogin, localStorage.getItem('access_token')]);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(API_BASE_URL + 'playlists');
    //             setTopics(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, []);
    const handleClick = (song, index) => {
        dispatch(setCurrentPlaylist(userfavorite));
        dispatch(setCurrentIdPlaylist(userfavorite[0].id));
        dispatch(setCurrentSongIndex(index));
    }
    return (
        <div className="" id="content">
            <div className="content_home">
                <Navbar />
                <div className="list-song p-4">\
                    <div className="topic">
                        {
                            userfavorite.length > 0 ? (
                                <div className="topic__favorite">
                                    <h2 className="topic-title">Có thể bạn thích</h2>
                                    <OwlCarousel className="owl-theme" {...options}>
                                        {userfavorite.map((song, index) => (
                                            <li key={index} className="topic__list_song__item">
                                                <div className='topic__list_song__item_wrapper'>
                                                    <div className="topic__list_song__item__img" onClick={() => handleClick(song, index)}>
                                                        <img src={song.thumbnail} alt="song" />
                                                        <div className="song-item-play-btn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAWJJREFUeF7tmlEKAjEMBTcHF/Q8eiBvUym4f6Kw2SbvyfivtrMzAYOx8fpKIODznQCAfhgCIADlhggGYRAG5QhgUI4fMwiDMChHAINy/JhBGIRBOQIYlOPHDOowaIxx37btEhHP3PPrf/cSg8YY4321a0Tc+q95/ASrAc2TTYumTY/jx+x7ZwWg/XYTkF12lYB2UFbZdQCyyq4LkE123YDks1MBJJudEiDJ7BQBSWWnDEgiO3VA7dm5AGrLzg1QeXaOgEqzcwZUkt0/AFqaHYCaVq77RrFi07V0feJsUMkCzhFQ6QrXDdDSnD7NAxdAJTk5AirNyQ1QeU4ugNpyUgfUnpMyIImcFAFJ5aQESDInFUCyOXUDks+pC5BNTh2ArHKqBMRf8Co2YQrfseTXvMLFzjoDgDp20mc9PYXPwSAMynmIQRiEQTkCGJTjxwzCIAzKEcCgHD9mEAZhUI4ABuX4vQBtbspJppNmhwAAAABJRU5ErkJggg=="/></div>
                                                    </div>
                                                    <div className="topic__list_song__item__info">
                                                        <p className='topic__list_song__item__name struncate'>{song.title}</p>
                                                            <div className="topic__list_song__item__authors struncate">
                                                                {
                                                                    song.artists.map((artist, index) => {
                                                                        return (
                                                                            <Link to={`/artist/${artist.alias}`} className='link'>
                                                                                <span>{artist.name}</span>
                                                                                {index !== song.artists.length - 1 && ', '}
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </OwlCarousel>
                                </div>
                            ) : null
                        }
                        {
                            albumsForYou.length > 0 ? (
                                <div className="topic__favorite">
                                    <h2 className="topic-title">Make for you</h2>
                                    <OwlCarousel className="owl-theme" {...options}>
                                        {albumsForYou.map((album, index) => {
                                            return (
                                                <div className="item" key={index}>
                                                <Link to={`/${"album"}/${album.id}`}>
                                                    <div className="card-song">
                                                        <div className="card-song-img">
                                                            <img src={album.thumbnail} alt="{playlist.title}" />
                                                        </div>
                                                        <div className="card-song-info">
                                                            <div className="struncate card-song-name">{album.title}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            )
                                        })}
                                    </OwlCarousel>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}