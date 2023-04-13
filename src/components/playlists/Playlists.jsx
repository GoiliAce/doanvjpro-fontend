import React, { useState, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import axios from "axios";
import API_BASE_URL from '../../config';
import { Topic } from '../topic/Topic';
import Loading from '../../assets/gif/Loading-cat.gif';
import './Playlists.css';
export const Playlists = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + '/topics');
        setTopics(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="" id="content">
      <div className="content_home">
        <Navbar />
        <div className="list-song p-4">

          {topics.length === 0 ? (
            <div className="loading text-center">
              <img src={Loading} alt="loading" />
              <h1 className='display-4'>Trang đang load bạn vui lòng đợi xíu nha</h1>
            </div>
          ) : (
            topics.map(topic => (
              <Topic topic={topic} key={topic.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
