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
import { BarChart } from '../chart/chartContent';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';


const ArtitsPopular = () => {    
    const [artistsPopular, setArtistsPopular] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}artists/popular`);
                setArtistsPopular(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="artists-popular mb-4">
            <h2 className="topic-title">Nghệ sĩ nổi bậc</h2>
            <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={5} slidesPerGroup={1} virtual >
                {artistsPopular.map((artist, index) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <Link className='link home__content__list_artist__item_wrapper' to={`/artist/${artist.alias}`}>
                            <div className="home__content__list_artist__item__img">
                                <img src={artist.thumbnail} alt="artist" />
                            </div>
                            <div className="home__content__list_artist__item__info">
                                <h4 className='text-center'>{artist.name}</h4>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
export const Home = () => {
    const [topics, setTopics] = useState([]);
    const [userfavorite, setUserfavorite] = useState([]);
    const dispatch = useDispatch();
    const accountLogin = useSelector((state) => state.accountLogin);
    const [albumsForYou, setAlbumsForYou] = useState([]);
    const [topHitWeek, setTopHitWeek] = useState([]);
    const [songTopHitWeek, setSongTopHitWeek] = useState([]);
    const currentSongID = useSelector((state) => state.currentSong);
    const [randomAlbums, setRandomAlbums] = useState([]);
    const [randomCategories, setRandomCategories] = useState([]);
    const options = {
        items: 10,
        margin: 30,
        loop: true,
        nav: false,
        dots: false,
    };
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (localStorage.getItem('access_token') && accountLogin.isLogin) {
                try {
                    const userFavorites = await axios({
                        method: 'get',
                        url: API_BASE_URL + 'user/recommend/',
                        headers: {
                            authorization: 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
                    setUserfavorite(userFavorites.data);
                    console.log("hihi", userFavorites.data);

                    const albumsForYou = await axios({
                        method: 'get',
                        url: API_BASE_URL + 'user/recommend/album',
                        headers: {
                            authorization: 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
                    setAlbumsForYou(albumsForYou.data);
                    console.log("hihi1", albumsForYou.data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setUserfavorite([]);
                setAlbumsForYou([]);
            }
        };

        fetchRecommendations();
    }, [accountLogin.isLogin, localStorage.getItem('access_token')]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const randomAlbumsResponse = await axios.get(`${API_BASE_URL}random-albums`);
                setRandomAlbums(randomAlbumsResponse.data.albums);
                setRandomCategories(randomAlbumsResponse.data.categories);

                const topHitWeekResponse = await axios.get(`${API_BASE_URL}get-listen`);
                setTopHitWeek(topHitWeekResponse.data);
                setSongTopHitWeek(topHitWeekResponse.data.map(item => item.song));
        
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    
    const handleClick = (song, index) => {
        dispatch(setCurrentPlaylist(userfavorite));
        dispatch(setCurrentIdPlaylist(userfavorite[0].id));
        dispatch(setCurrentSongIndex(index));
    }
    const handleSongClick = (index, songs) => {
        dispatch(setCurrentPlaylist(songs));
        dispatch(setCurrentIdPlaylist(songs[0].id));
        dispatch(setCurrentSongIndex(index));
    };
    const handleAddSongFavorite = (song) => {
        
        if (accountLogin.isLogin) {
            axios({
                method: 'put',
                url: API_BASE_URL + 'user/add-song-user',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                data: {
                    songId: song.id,
                    islike: !song.islike
                }
            }).then(()=>{
                song.islike = !song.islike;         
            })
        }
    }
    return (
        <div className="" id="content">
            <div className="content_home">
                <Navbar />
                <div className="list-song p-4">
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
                                                        <div className="song-item-play-btn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAWJJREFUeF7tmlEKAjEMBTcHF/Q8eiBvUym4f6Kw2SbvyfivtrMzAYOx8fpKIODznQCAfhgCIADlhggGYRAG5QhgUI4fMwiDMChHAINy/JhBGIRBOQIYlOPHDOowaIxx37btEhHP3PPrf/cSg8YY4321a0Tc+q95/ASrAc2TTYumTY/jx+x7ZwWg/XYTkF12lYB2UFbZdQCyyq4LkE123YDks1MBJJudEiDJ7BQBSWWnDEgiO3VA7dm5AGrLzg1QeXaOgEqzcwZUkt0/AFqaHYCaVq77RrFi07V0feJsUMkCzhFQ6QrXDdDSnD7NAxdAJTk5AirNyQ1QeU4ugNpyUgfUnpMyIImcFAFJ5aQESDInFUCyOXUDks+pC5BNTh2ArHKqBMRf8Co2YQrfseTXvMLFzjoDgDp20mc9PYXPwSAMynmIQRiEQTkCGJTjxwzCIAzKEcCgHD9mEAZhUI4ABuX4vQBtbspJppNmhwAAAABJRU5ErkJggg==" /></div>
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
                        <div className="topic__top-hit">
                            <h2 className="topic-title">Top hit nghe nhiều nhất tuần qua</h2>
                            <div className="top-hit bar-chart">
                                <BarChart data={topHitWeek} />
                            </div>
                            {
                                topHitWeek.length > 0 ? (
                                    <div className='wrapper-songs'>
                                        <ul className='list-songs'>
                                            <li className='song-item'>
                                                <div className='song-item__id'>#</div>
                                                <div className='song-item__title'>Title</div>
                                                <div className='song-item__author'>Artists</div>
                                                <div className='song-item__durations'>Durations</div>
                                            </li>
                                            {
                                                songTopHitWeek.map((song, index) => {
                                                    return (
                                                        <li className={`song-item ${currentSongID == song.id ? 'song-activate' : ''}`} >
                                                            <div className={`song-item__id ${currentSongID == song.id ? 'spin' : ''}`} onClick={() => handleSongClick(index, songTopHitWeek)}>{index + 1}</div>
                                                            <div className='song-item__title'>{song.title}</div>
                                                            <div className='song-item__author struncate'>
                                                                {
                                                                    song.artists.map((artist, idx) => {
                                                                        return (
                                                                            <span key={artist.id}>
                                                                                <Link className={`link ${currentSongID == song.id ? 'song-activate' : ''}`} to={`/artist/${artist.alias}`}>{artist.name}</Link>
                                                                                {idx !== song.artists.length - 1 && ', '}
                                                                            </span>
                                                                        )
                                                                    }
                                                                    )
                                                                }
                                                            </div>
                                                            <div className='song-item__durations'>
                                                                <div className="add_favorite" onClick={() => handleAddSongFavorite(song)} key={index}>
                                                                    <i className={`${song.islike ? 'active fas' : 'far'} fa-heart`} ></i>
                                                                    <div className="tooltip">
                                                                        <span>{song.islike ? 'Remove favorite' : 'Add to favorite'}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="duration">{new Date(song.duration * 1000).toISOString().substr(14, 5)}</div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                ) : null
                            }
                            
                            
                        </div>
                        <ArtitsPopular />
                        {
                            randomAlbums.length > 0 ? (
                                <div className="topic__favorite">
                                    <h2 className="topic-title">{'Nhạc '+ randomCategories[0].title +' cho ngày mới tốt lành'}</h2>
                                    <OwlCarousel className="owl-theme" {...options}>
                                        {randomAlbums.map((album, index) => {
                                            return (
                                                <div className="item" key={index}>
                                                    <Link to={`/${"album"}/${album.id}`}>
                                                        <div className="card-song">
                                                            <div className="card-song-img">
                                                                <img src={album.thumbnail} alt={album.title} />
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