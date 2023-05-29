import React, { useEffect, useState, useCallback } from 'react';
import 'boxicons';
import './sidebar.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccountLogin, setShowLoginForm, setShowSettingForm } from '../../redux/actions';
import API_BASE_URL from '../../config';
import axios from 'axios';
import { UserSetting } from '../userSetting/userSetting';
import defaultAvatar from '../../assets/images/avt.png';
import { setCurrentIdPlaylist, setCurrentPlaylist, setCurrentSongIndex } from '../../redux/actions';
export const Sidebar = () => {
    const dispatch = useDispatch();
    const [isSidebarHidden, setIsSidebarHidden] = useState(true);
    const accountLogin = useSelector((state) => state.accountLogin);
    const currentListeningSongList = useSelector((state) => state.currentListeningSongList);
    const reversedList = currentListeningSongList.slice().reverse();
    const currentIdPlaylist = useSelector((state) => state.idPlaylist);
    const [access_token, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [isLogin, setIsLogin] = useState(false);

    const fetchData = useCallback(async () => {
        if (access_token && !accountLogin.isLogin) {
            try {
                const response = await axios.get(`${API_BASE_URL}user`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                dispatch(setAccountLogin({
                    ...response.data,
                    isLogin: true
                }));
            } catch (error) {
                console.log(error);
            }
        }
    });

    useEffect(() => {
        fetchData();
    }, [access_token]);

    console.log(accountLogin);

    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };
    const handleSetShowLoginForm = () => {
        if (accountLogin.isLogin) {
            dispatch(setAccountLogin(
                {
                    isLogin: false,
                    username: '',
                    email: '',
                    thumbnail: '',
                    id: ''
                }
            ))
            localStorage.removeItem('access_token');
            // localStorage.removeItem('currentListeningSongList');

        } else {
            dispatch(setShowLoginForm(true));
        }
    }
    useEffect(() => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
        allSideMenu.forEach(item => {
            const li = item.parentElement;
            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            });
        });
    }, []);
    useEffect(() => {
        const imgElement = document.getElementById('avatar-sidebar');
        if (imgElement && accountLogin.thumbnail) {
            imgElement.src = accountLogin.thumbnail;
        }
    }, [accountLogin.thumbnail], dispatch);
    const active = useSelector((state) => state.showSettingForm);
    const handleOpenUserSetting = () => {
        dispatch(setShowSettingForm(true));
    }
    const handleClick = (currentListeningSongList, index) => {
        dispatch(setCurrentPlaylist(currentListeningSongList));
        dispatch(setCurrentSongIndex(index));
    }
    return (
        <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
            <div href="#" className="brand">
                <box-icon onClick={toggleSidebar} name='menu' color='#fff'></box-icon>
                <span className="text">zeomp2</span>
            </div>
            <ul className="side-menu top">
                <li className="active">
                    <Link to="/">
                        <box-icon name='home' color='#565656' ></box-icon>
                        <span className="text">Home</span>
                    </Link>

                </li>
                <li>
                    <Link to="/playlists">
                        <box-icon name='playlist' type='solid' color='#565656' ></box-icon>
                        <span className="text">Playlist</span>
                    </Link>


                </li>
                <li>
                    <Link to="/albums">
                        <box-icon name='album' color='#565656' ></box-icon>
                        <span className="text">Album</span>
                    </Link>
                </li>
                <li>
                    <a href="#">
                        <box-icon name='hot' type='solid' color='#565656' ></box-icon>
                        <span className="text">Hot and new</span>
                    </a>
                </li>
                <li>
                    <Link to="/user">
                        <box-icon name='dashboard' type='solid' flip='vertical' color='#565656' ></box-icon>
                        <span className="text">You</span>
                    </Link>
                </li>
            </ul>
            <ul className="side-menu center">
                {
                    accountLogin.isLogin ? (
                        <li>
                            <div className=' sub-li user '>
                                <div className="user__img">
                                    <img id='avatar-sidebar' src={accountLogin.thumbnail ? accountLogin.thumbnail : defaultAvatar} width='32' />
                                </div>
                                <span className="text">{accountLogin.username}</span>
                            </div>
                        </li>
                    ) : ''
                }
                <li>
                    <Link to="setting">
                        <box-icon name='cog' color='#565656' ></box-icon>
                        <span className="text">Settings</span>
                    </Link>
                </li>
                <li>
                    <div className="logout sub-li" onClick={handleSetShowLoginForm}>
                        <box-icon name={accountLogin.isLogin ? 'log-out' : 'log-in'} color='#565656' ></box-icon>
                        <span className="text">{accountLogin.isLogin ? 'Logout' : 'Login'}</span>
                    </div>
                </li>
            </ul>
            {
                currentListeningSongList.length > 0 ? (
                    <ul className="current-listening__list">
                        {
                            reversedList.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="current-listening__item">
                                            <div className="current-listening__item__img user__img" onClick={()=>handleClick(reversedList,index)}>
                                                <img className='avatar-sidebar' src={item.thumbnail} alt="" />
                                            </div>
                                            <div className="current-listening__item__info">
                                                <div className="current-listening__item__info__title struncate" onClick={()=>handleClick(reversedList,index)}>
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className="current-listening__item__info__artist">
                                                    {
                                                        item.artists.map((artist, idx) => {
                                                            return (
                                                                <span key={artist.id}>
                                                                    <Link className={`link`} to={`/artist/${artist.alias}`}>{artist.name}</Link>
                                                                    {idx !== item.artists.length - 1 && ', '}
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>

                ) : null
            }
        </section>
    );
}

