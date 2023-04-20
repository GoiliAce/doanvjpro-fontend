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
import e404 from "./assets/images/404.png";
import { Error } from "./components/subcomponents/subcomponents";
import { Albums } from "./components/albums/albums";
import { Album } from "./components/albums/album";
import { SearchPage } from "./components/search/search";

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Sidebar />
          <LoginForm/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist/:id" element={<Playlist  />} />
            <Route path="artist/:alias" element={<Artist />} />
            <Route path="setting" element={<UserSetting />} />
            <Route path="albums" element={<Albums/>} />
            <Route path="album/:id" element={<Album />} />
            <Route path='search/' element={<SearchPage />} />
            <Route path="*" element={<Error id='content' img={e404} content="404 page not found" />} />
          </Routes>
          <MusicPlayer />
        </BrowserRouter>
    </div>
  );
};

export default App;