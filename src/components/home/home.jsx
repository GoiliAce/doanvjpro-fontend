import React, { useState, useEffect } from 'react';
import { Navbar  } from '../navbar/Navbar';
import { Topic } from '../topic/Topic'
import axios from "axios";
import API_BASE_URL from '../../config';
export const Home = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL+'/topics');
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
        {/* start recomment song */}
        <div className="list-song p-4">
          {topics.map(topic => (
            <Topic topic={topic} key={topic.id} />
          ))}
        </div>
        {/* end recomment song */}
      </div>
    </div>
  );
}
