import { Route, Outlet } from 'react-router-dom';
import { Nav } from './nav/Nav'
import { MusicPlayer } from './music-player/MusicPlayer'
import React from "react";

export const Layout = () => {
    return (
      <div className="container-fluid no-padding">
        <div className="row no-margin "> 
          <Nav /> 
          <Outlet />
        </div>
        <MusicPlayer/>
      </div>
    );
  };
