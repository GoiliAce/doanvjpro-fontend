import './nav.css'
import React, { useState, useEffect } from 'react';
export const Nav = () => {
    const navBarResize = () => {
        const navbar = document.getElementById("navbar");
        const content = document.getElementById("content");
        navbar.style.width = `calc(100% - ${content.offsetWidth}px)`;
    }

    useEffect(() => {
        navBarResize();
        window.addEventListener('resize', navBarResize);
        return () => {
            window.removeEventListener('resize', navBarResize);
        };
    }, []);

    return (
        <div className="col-md-2 no-padding">
            <div className="navbar-wrapper" id="navbar">
                {/* start user profile */}
                <div className="user-wrapper">
                    <div className="user-img-wrapper">
                        <img src='https://source.unsplash.com/random' alt="" className="user-img" />
                    </div>
                    <div className="user-info">
                        <p className="user-name">Some one</p>
                        {/* <div className="user-role">Admin</div> */}
                    </div>
                </div>
                {/* end user profile*/}
                {/* start sidebar */}
                <div className="sidebar-wrapper">
                    <ul className="sidebar-menu">
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-link">
                                {/* <FaHome /> */}
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-link">
                                {/* <FaUser /> */}
                                <span>Albums</span>
                            </a>
                        </li>
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-link">
                                {/* <FaUser /> */}
                                <span>Song</span>
                            </a>
                        </li>
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-link">
                                {/* <FaUser /> */}
                                <span>Playlists</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}