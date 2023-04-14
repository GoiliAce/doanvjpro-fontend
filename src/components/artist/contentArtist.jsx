import { Link } from 'react-router-dom';
import './contentArtist.css'
import { useDispatch } from 'react-redux';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions';
import { useSelector } from 'react-redux';
export const ContentArtist = ({songs, artist}) => {
    const col = 6
    const dispatch = useDispatch();
    const handleSongClick = (index,songs) => {
        dispatch(setCurrentPlaylist(songs));
        dispatch(setCurrentIdPlaylist(artist.id));
        dispatch(setCurrentSongIndex(index));
    };
    return (
        <div className="wrapper-content">
        <div className="row list-songs">
            <h2 className='text-white'>Popular</h2>
            {
                songs && songs.map((song, index) => {
                    return (
                        <div className={`col-${col}`}>
                            <div className="song-item-artist">
                                <div className="song-item-artist__id" onClick={() => handleSongClick(index,songs)}>{index + 1}</div>
                                <div className="song-item-artist__img">
                                    <img src={song.thumbnail} alt="" width={48}/>
                                </div>
                                <div className="song-item-artist__title">{song.title}</div>
                                <div className="song-item-artist__author">{
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
    </div>
    )
}