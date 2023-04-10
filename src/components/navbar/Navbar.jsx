import React from 'react';
import { useState } from 'react';
import './navbar.css';
import 'boxicons'

export const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle search
    };


    return (
        <nav>

            <form onSubmit={handleSubmit}>
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
            </form>
            <a href="#" className="notification">
            <box-icon name='bell' ></box-icon>
                <span className="num">8</span>
            </a>
            <a href="#" className="profile">
                <img src="https://source.unsplash.com/random" alt="user profile" />
            </a>
        </nav>
    );
};
