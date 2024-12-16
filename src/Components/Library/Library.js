import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Library.css'

export default function Library() {
  const [saved, setSaved] = useState({});
  useEffect(()=>{
    window.addEventListener("storage", ()=>{
      const preSaved = localStorage.getItem("spotifyLibrary");
      if (preSaved) {
        setSaved(JSON.parse(preSaved));
      } else {
        setSaved({});
      }
    })
  },[]);
  return (
    <div id="libraryInnerWrapper">
        <div id="libTitle">
        <FontAwesomeIcon icon="fa-solid fa-book" style={{color: "#b3b3b3",}} />
        <div>Your Library</div>
        </div>
        <div id="libTitles">
          {saved && Object.entries(saved).map(([key, item], index)=>(
            <Link to={`/track/${item.id}`} className="libCard" key={index}>
              <img src={item.album.cover[0].url} alt={item.name}/>
              <div className="libCardText">
                <p className="cardTitle">{item.name}</p>
                <p className="cardArtists">{item.artists[0].name}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
