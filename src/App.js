import React, { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Playlists } from "./components/playlists/Playlists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Playlist } from './components/playlists/Playlist';
import { Sidebar } from './components/sidebar/Sidebar';
import { MusicPlayer } from './components/music-player/MusicPlayer';
import { Home } from './components/home/Home';
export const HandleSongClickContext = createContext(null);

export const CurrentSongContext = createContext(null);

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSongs, setCurrentSongs] = useState([]);
  const handleSongClick = ({ index, songs }) => {
    setCurrentIndex(index);
    setCurrentSongs(songs);
  };
  return (
    <CurrentSongContext.Provider value={[currentIndex, currentSongs, setCurrentIndex, setCurrentSongs]}>
      <HandleSongClickContext.Provider value={handleSongClick}>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist/:id" element={<Playlist />} />
          </Routes>
          <MusicPlayer />
        </BrowserRouter>
      </HandleSongClickContext.Provider>
    </CurrentSongContext.Provider>
  );
};

export default App;