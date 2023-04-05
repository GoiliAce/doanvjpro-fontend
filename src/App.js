import React, { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './components/home/home'
import $ from 'jquery';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './components/Layout';
import { Playlist } from './components/playlist/Playlist';


export const HandleSongClickContext = createContext(null);

export const CurrentSongContext = createContext(null);

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSongs, setCurrentSongs] = useState([]);
  const handleSongClick = ({index,songs}) => {
    setCurrentIndex(index);
    setCurrentSongs(songs);
  };
  return (
    <CurrentSongContext.Provider value={[currentIndex,currentSongs,setCurrentIndex,setCurrentSongs]}>
      <HandleSongClickContext.Provider value={handleSongClick}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="playlist/:id" element={<Playlist />} />
            </Route> 
          </Routes>
        </BrowserRouter>
      </HandleSongClickContext.Provider>
    </CurrentSongContext.Provider>
  );
};

export default App;