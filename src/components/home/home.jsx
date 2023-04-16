import React, { useState, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import axios from "axios";
import API_BASE_URL from '../../config';
import Loading from '../../assets/gif/Loading-cat.gif';
import './home.css';
export const Home = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + 'playlists');
                setTopics(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <h1>hihi</h1>
    )
}