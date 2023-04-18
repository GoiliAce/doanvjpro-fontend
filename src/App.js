import React, { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Playlists } from "./components/playlists/Playlists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Playlist } from './components/playlists/Playlist';
import { Sidebar } from './components/sidebar/Sidebar';
import { MusicPlayer } from './components/music-player/MusicPlayer';
import { Home } from './components/home/home';
import { Artist } from './components/artist/artist';
import { LoginForm } from "./components/login/login";
import { UserSetting } from "./components/userSetting/userSetting";
export const HandleSongClickContext = createContext(null);

export const CurrentSongContext = createContext(null);

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Sidebar />
          <LoginForm/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist/:id" element={<Playlist />} />
            <Route path="artist/:alias" element={<Artist />} />
            <Route path="setting" element={<UserSetting />} />
          </Routes>
          <MusicPlayer />
        </BrowserRouter>
    </div>
  );
};

export default App;