import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import './Root.css'
import Library from './Components/Library/Library'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <div id="container">
        <Navbar/>
        <div id="body">
          <div id="libraryWrapper">
            <Library/>
          </div>
          <div id="routeWrapper">
            <Outlet/>
          </div>
        </div>
        <div id="playerWrapper"></div>
      </div>
    </>
  )
}
