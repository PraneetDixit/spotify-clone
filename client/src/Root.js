import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import './Root.css'
import Library from './Components/Library/Library'
import { Outlet } from 'react-router-dom'
import Player from './Components/Player/Player'

export default function Root() {
  const [currentTrack, setCurrentTrack] = useState(null);
  return (
    <>
      <div id="container">
        <Navbar/>
        <div id="body">
          <div id="libraryWrapper">
            <Library/>
          </div>
          <div id="routeWrapper">
            <Outlet context={[setCurrentTrack]}/>
          </div>
        </div>
        <div id="playerWrapper">
          <Player currentTrack={currentTrack}/>
        </div>
      </div>
    </>
  )
}
