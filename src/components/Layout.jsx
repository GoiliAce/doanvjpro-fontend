import { Route, Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar'
import { MusicPlayer } from './music-player/MusicPlayer'
import React from "react";

export const Layout = () => {
    return (
      <div className="container-fluid no-padding">
          <Sidebar /> 
          <Outlet />
        <MusicPlayer/>
      </div>
    );
  };
