import React, { useEffect, useState } from 'react';
import 'boxicons';
import './sidebar.css';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };
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
    return (
        <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
            <a href="#" className="brand">
                <box-icon onClick={toggleSidebar} name='menu' color='#fff'></box-icon>
                <span className="text">zeomp2</span>
            </a>
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
                <li>
                    <a href="#">
                        <box-icon name='cog' color='#565656' ></box-icon>
                        <span className="text">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="logout">
                        <box-icon name='log-out' color='#565656' ></box-icon>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

