import React from 'react';
import { useState } from 'react';
import './navbar.css';
import 'boxicons'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setShowLoginForm, setAccountLogin } from '../../redux/actions';
import API_BASE_URL from '../../config';
import { useNavigate  } from 'react-router-dom';

import { setIsPlaying, accessToken } from '../../redux/actions';
import axios from 'axios';
export const Navbar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const [showNav, setShowNav] = useState(false);
    const isPlaying = useSelector((state) => state.isPlaying);
    const accessToken = useSelector((state) => state.accessToken);
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 512) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?search=${searchTerm}`);
    };


    return (
        <nav className={showNav&&props.content ? 'hide' : ''}>
            {props.content ? (
                <div className='nav-content'>
                    <img className={!isPlaying? 'spin':''} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAg9JREFUWEftl/9100AMxyUvABvQTkAkD0CYoN2AMAEwQZsNugFhgsIEwAA+mQlIJ6AsEPHUp8u7GMd3LvjR8nx/xe980kdf/fAF4YEtfGA88H8AichTADhT1RUA2O+FK92q6raqqi8A8ImItmMzMEohB7lQ1bcljlR1U1XVegxYMZCILFT1sytSwhPfuUXE10T0seRQEZCInKvq+w7MN0S8AoCWiFpXb7Hb7ZaIaCk8SwEcapODygL1KPMTEVe5iD0IA3gSIUqgBoEsalUVADhxo6bKeWlN+Hkr8Od+3tJHQ+cHgZqmuUTECzdmyixKYaIqInKiqm2i1Admtu7sXUeBPLrvsW5K5D7mRERWXoN3ryDi6bHAhoCskK/dyQ0zx7Tl6rJ3P4RgqXthm6r6rq5ra4jf1lGgEIIV5Cs3sK7r+vJeJH6ok/6vzLwcC7SPCBFfEpE933uJyNLnmNlomZnGAmk8wMzZ8ZAj9Zr8kbM5lLK/CmQgIYSszRlodMqaprlCRPsO7dvcaijtElXNdl3f+2nKAGCLiBsiWqf1d5Ayh3nTLdCJgO7cdIM7AAoh3KYfw1TeCRSK5rfMfBofukD7LkhVmlIh85OOlRmob4DOCsVO6rT9XqxHpdC/aPuDu1Z3MKZX1gNJp5pDg4PRCNyx3XmfTTwYb+yPZPfi98f3nNw9aOz+DJRTbFbo0Sn0C4229DT3Eo6YAAAAAElFTkSuQmCC" />
                    <h1>{props.content}</h1>
                </div>
            ) : (<form onSubmit={handleSubmit}>
                <div className="form-input">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type="submit" className="search-btn">
                        <box-icon name='search-alt-2' ></box-icon>
                    </button>
                </div>
            </form>)}

        </nav>
    );
};
