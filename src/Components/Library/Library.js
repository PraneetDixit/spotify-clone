import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Library.css'

export default function Library() {
  return (
    <div id="libraryInnerWrapper">
        <div id="libTitle">
        <FontAwesomeIcon icon="fa-solid fa-book" style={{color: "#b3b3b3",}} />
        <div>Your Library</div>
        </div>
    </div>
  )
}
