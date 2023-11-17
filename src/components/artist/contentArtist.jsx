import { Link } from 'react-router-dom';
import './contentArtist.css'
import { useDispatch } from 'react-redux';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions';
import { useSelector } from 'react-redux';
export const ContentArtist = ({songs, artist, albums}) => {
    const col = 6
    const dispatch = useDispatch();
    const handleSongClick = (index,songs) => {
        dispatch(setCurrentPlaylist(songs));
        dispatch(setCurrentIdPlaylist(artist.id));
        dispatch(setCurrentSongIndex(index));
    };
    return (
        <div className="wrapper-content">
        <div className="row list-songs no-margin mb-5">
            <h2 className='text-white'>Popular</h2>
            {
                songs && songs.map((song, index) => {
                    return (
                        <div className={`col-${col}`}>
                            <div className="song-item-artist">
                                <div className="song-item-artist__img">
                                    <img src={song.thumbnail} alt="" width={48}/>
                                    <div className="song-item-play-btn" onClick={() => handleSongClick(index,songs)}><box-icon name='play' color='#fff' ></box-icon></div>
                                </div>
                                <div className="song-item-artist__title struncate">{song.title}</div>
                                <div className="song-item-artist__author struncate">{
                                    song.artists.map((artist, index) => {
                                        return (
                                            <Link to={`/artist/${artist.alias}`} className='link'>
                                                <span>{artist.name}</span>
                                                {index !== song.artists.length - 1 && ', '}
                                            </Link>
                                        )
                                    })
                                }</div>
                                <div className="song-item-artist__durations">{new Date(song.duration * 1000).toISOString().substr(14, 5)}</div>
                            </div>
                        </div>
                    )
                })
            }
       </div>
       <div className="list-songs list-albums">
       <h2 className='text-white'>Album</h2>
                {
                    albums.length > 0 && (
                        <ul className='search__content__list_album p-0'>
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
                        )
                }
       </div>
    </div>
    )
}