import React, { useEffect, useState } from 'react';
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
export const Sidebar = () => {
    const dispatch = useDispatch();
    const [isSidebarHidden, setIsSidebarHidden] = useState(true);
    const accountLogin = useSelector((state) => state.accountLogin);
    const access_token = localStorage.getItem('access_token');
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const fetchData = async () => {
            if (access_token && !accountLogin.isLogin) {
                try {
                    const response = await axios.get(`${API_BASE_URL}user`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
        }
        fetchData();
    }, [accountLogin.isLogin, dispatch]);

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
                    avatar: '',
                    id: ''
                }
            ))
            localStorage.removeItem('access_token');
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
                    <a href="#">
                        <box-icon name='album' color='#565656' ></box-icon>
                        <span className="text">Album</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <box-icon name='hot' type='solid' color='#565656' ></box-icon>
                        <span className="text">Hot and new</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <box-icon name='dashboard' type='solid' flip='vertical' color='#565656' ></box-icon>
                        <span className="text">You</span>
                    </a>
                </li>
            </ul>
            <ul className="side-menu">
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
        </section>
    );
}

