import React, { useState, useEffect } from 'react';
import { Search } from '../search/search';
import { Nav } from '../nav/Nav';
import { Topic } from '../topic/Topic'
import axios from "axios";

export const Home = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/topics');
        setTopics(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="col-md-10 no-padding" id="content">
      <div className="content_home">
        <Search />
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
