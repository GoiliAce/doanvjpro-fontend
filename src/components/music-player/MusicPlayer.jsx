import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import axios from "axios";
import "./MusicPlayer.css";
import { CurrentSongContext } from "../../App";
import API_BASE_URL from '../../config';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentPlaylist, setCurrentSongIndex, setIsPlaying, setSongPlaying } from '../../redux/actions';
export const MusicPlayer = () => {
    const dispatch = useDispatch();
    const [audio, setAudio] = useState(null);
    const audioElement = document.querySelector('audio');
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [prevVolume, setPrevVolume] = useState(100);
    const playlist = useSelector((state) => state.playlist);
    const isPlaying = useSelector((state) => state.isPlaying);
    const currentSongIndex = useSelector((state) => state.currentSongIndex);
    const [currentSong, setCurrentSong] = useState(playlist[currentSongIndex]);

    useEffect(() => {
        setCurrentSong(playlist[currentSongIndex]);
        // tăng lượt nghe khi bài hát được chọn
        if (currentSong) {
            const listenerCount = currentSong.listen + 1;
            currentSong.listen = listenerCount;
            console.log(currentSong.listen);
            axios({
                method:'put',
                url: API_BASE_URL+'song/'+currentSong.id,
                data: currentSong,
                withCredentials: true
            })
            .catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            });
        }
    }, [currentSongIndex]);
    useEffect(() => {
        if (currentSong !== null) {
            async function fetchData() {
                try {
                    const response = await axios.get(API_BASE_URL + `audio/${currentSong.id}`);
                    setAudio(response.data);
                } catch (error) {
                    console.log(error);
                }
            }

            fetchData();
        }
    }, [currentSong]);
    
    useEffect(() => {
        // update listener count when song is changed or played 
        if (currentSong) {
            const listenerCount = currentSong.listen + 1;
            currentSong.listen = listenerCount;
            console.log(currentSong.listen);
            axios({
                method:'put', 
                url: API_BASE_URL + 'song/'+currentSong.id,
                data: currentSong,
                xsrfCookieName: 'csrftoken',
                xsrfHeaderName: 'X-CSRFTOKEN',
                withCredentials: true
            })
        }
        
    }, [currentSong]);



    // auto next song
    useEffect(() => {
        if (audioElement) {
            audioElement.addEventListener('ended', () => {
                handleNextSong();
            });
        }
    }, [audioElement]);
    const handleSongPlayback = () => {
        if (audioElement.paused) {
            audioElement.play();
            dispatch(setIsPlaying(false));
        } else {
            audioElement.pause();
            dispatch(setIsPlaying(true));
        }
    };
    useEffect(() => {
        const updateProgress = () => {
            const duration = audioElement.duration;
            const currentTime = audioElement.currentTime;
            const progressPercent = (currentTime / duration) * 100;
            setProgress(progressPercent);
        };

        if (audioElement) {
            audioElement.addEventListener('timeupdate', updateProgress);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, [audioElement]);
    const handlePrevSong = () => {
        if (currentSongIndex > 0) {
            dispatch(setCurrentSongIndex((currentSongIndex - 1)));
            // setCurrentSong(playlist[currentSongIndex - 1]);
        } else {
            dispatch(setCurrentSongIndex(playlist.length - 1));
            // setCurrentSong(playlist[playlist.length - 1]);
        }
    };
    const handleNextSong = () => {
        if (currentSongIndex < playlist.length - 1) {
            dispatch(setCurrentSongIndex((currentSongIndex + 1)));
            // setCurrentSong(playlist[currentSongIndex + 1]);
        } else {
            dispatch(setCurrentSongIndex(0));
            // setCurrentSong(playlist[0]);
        }
    };
    const startTimeElement = document.getElementById('start-time');
    const endTimeElement = document.getElementById('time-end');

    if (audioElement) {
        audioElement.addEventListener('timeupdate', () => {
            const currentSeconds = Math.floor(audioElement.currentTime % 60);
            const currentMinutes = Math.floor(audioElement.currentTime / 60);
            const durationSeconds = Math.floor(audioElement.duration % 60);
            const durationMinutes = Math.floor(audioElement.duration / 60);

            startTimeElement.textContent = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
            endTimeElement.textContent = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        });
    }

    // auto play when song url is changed
    useEffect(() => {
        if (audioElement) {
            audioElement.play();
            dispatch(setIsPlaying(false));
        }
    }, [audio]);


    const handleProgressChange = (event) => {
        const audioElement = document.querySelector('audio');
        const newTime = audioElement.duration * (event.target.value / 100);
        audioElement.currentTime = newTime;
        setProgress(event.target.value);
    };
    const volumeMuteBtn = document.getElementById('mute-volume');
    const handleVolumeChange = (event) => {
        const newVolume = event.target.value; // lấy giá trị âm lượng mới từ input
        setVolume(newVolume); // cập nhật giá trị âm lượng
        setPrevVolume(newVolume); // cập nhật giá trị âm lượng
        audioElement.volume = newVolume / 100; // đặt giá trị âm lượng cho audio
        if (newVolume == 0) {
            volumeMuteBtn.classList.remove('fa-volume-up');
            volumeMuteBtn.classList.add('fa-volume-mute');
        } else {
            volumeMuteBtn.classList.remove('fa-volume-mute');
            volumeMuteBtn.classList.add('fa-volume-up');
        }

    };
    const handleMute = () => {
        if (audioElement.volume !== 0) {
            setVolume(0)
            audioElement.volume = 0;
            volumeMuteBtn.classList.remove('fa-volume-up');
            volumeMuteBtn.classList.add('fa-volume-mute');
        } else {
            setVolume(prevVolume)
            audioElement.volume = prevVolume / 100;
            audioElement.className = 'fa fa-volume-up';
            volumeMuteBtn.classList.remove('fa-volume-mute');
            volumeMuteBtn.classList.add('fa-volume-up');
        }
    };
    const playPauseButton = document.getElementsByClassName('play-pause');
    if (audioElement !== null) {
        audioElement.addEventListener('play', () => {
            playPauseButton[0].classList.remove('fa-play');
            playPauseButton[0].classList.add('fa-pause');
        });
        audioElement.addEventListener('pause', () => {
            playPauseButton[0].classList.remove('fa-pause');
            playPauseButton[0].classList.add('fa-play');
        });
    }
    const handleRandomPlay = () => {
        // // Shuffle current songs array
        // const shuffledSongs = [...currentSongs].sort(() => Math.random() - 0.5);
        // setCurrentIndex(0);
        // setCurrentSongs(shuffledSongs);
        // setCurrentSong(shuffledSongs[0]);
    };

    return  (

            <div className={`music-player ${currentSong? 'active':''}`} id="music-player">
                <div className="song-bar">
                    <div className="song-infos">
                        <div className="image-container">
                            <img id="process-image" src={currentSong?.thumbnail} alt="image" />
                        </div>
                        <div className="song-description">
                            <p className="title" id="song-name">
                                {currentSong?.title}
                            </p>
                            <p className="artist" id="artist-name">
                                {currentSong?.artists.map((artist, index) => {
                                    return (
                                        <span key={artist.alias}>
                                            <Link className='link' to={`/artist/${artist.alias}`}>{artist.name}</Link>
                                            {index !== currentSong.artists.length - 1 && ', '}
                                        </span>
                                    )
                                }
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="icons">
                        <i className="far fa-heart"></i>
                        <i className="fas fa-compress"></i>
                    </div>
                </div>
                <div className="progress-controller">
                    <div className="control-buttons">
                        <i className="fas fa-random" onClick={handleRandomPlay}></i>
                        <i className="fas fa-step-backward" id="backward" onClick={handlePrevSong}></i>
                        <i
                            className={`play-pause fas fa-play`}
                            onClick={
                                handleSongPlayback
                            }
                        ></i>
                        <i className="fas fa-step-forward" id="forward" onClick={handleNextSong}></i>
                        <i className="fas fa-undo-alt"></i>
                    </div>
                    <div className="progress-container" id="#progress">
                        <span id="start-time">00:00</span>
                        <div className="progress-bar">
                            <input
                                type="range"
                                className="progress"
                                id="progressMusic"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleProgressChange}
                            />
                        </div>
                        <span id="time-end">00:00</span>
                    </div>
                </div>
                <div className="other-features">
                    <i className="fas fa-list-ul"></i>
                    <i className="fas fa-desktop"></i>
                    <div className="volume-bar">
                        <i className="fas fa-volume-down" id="mute-volume" onClick={handleMute}></i>
                        <div className="progress-bar">
                            <input
                                type="range"
                                className="progress"
                                id="volume-bar"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </div>
                    <audio src={audio?.url} preload="metadata" ></audio>
                </div>
        </div>
    );
};
