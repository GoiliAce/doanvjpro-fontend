import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import './search.css';
import { Navbar } from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Error } from '../subcomponents/subcomponents';
import errorSearch from '../../assets/images/error-search.png';
export const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(window.location.search);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search'));

    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);



    const currentPlaylist = useSelector(state => state.currentPlaylist);
    const currentIdPlaylist = useSelector(state => state.currentIdPlaylist);
    const currentSongIndex = useSelector(state => state.currentSongIndex);
    const handleClick = (song, index) => {
        dispatch(setCurrentPlaylist(songs));
        dispatch(setCurrentIdPlaylist(artist.id));
        dispatch(setCurrentSongIndex(index));
    }
    useEffect(() => {
        // Lấy giá trị "search" từ query string và cập nhật searchTerm
        const searchParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = searchParams.get('search');
        setSearchTerm(searchTermFromUrl || '');
    }, [window.location.search]);
    useEffect(() => {
        axios.get(API_BASE_URL + 'search/?search=' + searchTerm)
            .then(response => {
                setArtist(response.data.artists);
                setSongs(response.data.songs);
                setAlbums(response.data.albums);
                setPlaylists(response.data.playlists);

            })
            .catch(error => console.log(error));
    }, [searchTerm]);
    return (
        <div className="search" id='content'>
            <Navbar />
            {
            songs.length + albums.length + playlists.length + artist.length > 0 ? (
                <div className="search__content">
                    {
                        songs.length > 0 && (
                            <div className="search__content__list_item__song">
                                <h2>Bài hát cho <i>{searchTerm}</i></h2>

                                <ul className='search__content__list_song'>
                                    {songs.map((song, index) => (
                                        <li key={index} className="search__content__list_song__item">
                                            {/* <Link to={`/artist/${artist.id}/song/${song.id}`} onClick={() => handleClick(song, index)}>
                                    
                                </Link> */}
                                            <div className='search__content__list_song__item_wrapper'>
                                                <div className="search__content__list_song__item__img">
                                                    <img src={song.thumbnail} alt="song" />
                                                    <div className="song-item-play-btn" onClick={() => handleClick(song, index)}><box-icon name='play' color='#fff' ></box-icon></div>
                                                </div>
                                                <div className="search__content__list_song__item__info">
                                                    <h3>{song.title}</h3>
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
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                    {
                        artist.length > 0 && (
                            <div className="search__content__list_item__artist">
                                <h2>Nghệ sĩ cho <i>{searchTerm}</i></h2>
                                <ul className='search__content__list_artist'>
                                    {artist.map((artist, index) => (
                                        <li key={index} className="search__content__list_artist__item">
                                            <Link className='link search__content__list_artist__item_wrapper' to={`/artist/${artist.alias}`}>
                                                <div className="search__content__list_artist__item__img">
                                                    <img src={artist.thumbnail} alt="artist" />
                                                </div>
                                                <div className="search__content__list_artist__item__info">
                                                    <h4 className='text-center'>{artist.name}</h4>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        )
                    }
                    {
                        albums.length > 0 && (
                            <div className="search__content__list_item__album">
                                <h2>Album cho <i>{searchTerm}</i></h2>
                                <ul className='search__content__list_album'>
                                    {albums.map((album, index) => (
                                        <li key={index} className="search__content__list_album__item">
                                            <Link className='link search__content__list_album__item_wrapper' to={`/album/${album.id}`}>
                                                <div className="search__content__list_album__item__img">
                                                    <img src={album.thumbnail} alt="album" />
                                                </div>
                                                <div className="search__content__list_album__item__info">
                                                    <h4>{album.title}</h4>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                    {
                        playlists.length > 0 && (
                            <div className="search__content__list_item__album">
                                <h2>Playlist cho <i>{searchTerm}</i></h2>
                                <ul className='search__content__list_album'>
                                    {playlists.map((album, index) => (
                                        <li key={index} className="search__content__list_album__item">
                                            <Link className='link search__content__list_album__item_wrapper' to={`/playlist/${album.id}`}>
                                                <div className="search__content__list_album__item__img">
                                                    <img src={album.thumbnail} alt="album" />
                                                </div>
                                                <div className="search__content__list_album__item__info">
                                                    <h4>{album.title}</h4>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
            ) : (<Error id='content' img={errorSearch} content={`Không tìm thấy bất kỳ thứ gì cho từ khóa: ${searchTerm}`  } subcontent={"(hoặc có thể trang đang load á)"} />)
            }
        </div>
    )
}