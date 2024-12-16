import React, {useState, useEffect} from 'react'
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
  useEffect(()=>{console.log(saved)}, [saved]);
  return (
    <div id="libraryInnerWrapper">
        <div id="libTitle">
        <FontAwesomeIcon icon="fa-solid fa-book" style={{color: "#b3b3b3",}} />
        <div>Your Library</div>
        </div>
        <div id="libTitles">
          {saved && Object.entries(saved).map(([key, item], index)=>(
            <div className="libCard" key={index}>
              <img src={item.album.cover[0].url}/>
              <div className="libCardText">
                <p className="cardTitle">{item.name}</p>
                <p className="cardArtists">{item.artists[0].name}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
