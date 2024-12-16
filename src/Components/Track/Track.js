import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useOutletContext } from "react-router-dom";
import "./Track.css";
import meta from "./TrackMeta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Track() {
  const { id } = useParams();
  const [track, setTrack] = useState("");
  const [saved, setSaved] = useState(() => {
    const preSaved = localStorage.getItem("spotifyLibrary");
    if (preSaved) {
      return JSON.parse(preSaved);
    } else {
      return {};
    }
  });
  useEffect(() => {
    //API request limit reached
    // axios({
    //   method: "GET",
    //   url: "https://spotify-scraper.p.rapidapi.com/v1/track/metadata",
    //   params: {
    //     trackId: id,
    //   },
    //   headers: {
    //     "x-rapidapi-key": "c456acda40msh012159dc2abc3c9p1bbeb1jsn33ef9596085f",
    //     "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
    //   },
    // })
    //   .then((r) => {
    //     setTrack(r.data);
    //   })
    //   .catch((err) => {
    setTrack(meta);
    //   console.log(err);
    // });
  }, [id]);

  useEffect(() => {
    localStorage.setItem("spotifyLibrary", JSON.stringify(saved));
    window.dispatchEvent(new Event("storage"));
  }, [saved]);

  const toggleLiked = (item) => {
    console.log(item);
    if (saved[item.id]) {
      setSaved((prevState) => ({ ...prevState, [item.id]: undefined }));
    } else {
      setSaved((prevState) => ({ ...prevState, [item.id]: item }));
    }
  }

  const [setCurrentTrack] = useOutletContext();
  return (
    track && (
      <div id="track">
        <div id="head">
          <img src={track.album.cover[1].url} alt={track.name} />
          <div>
            <p className="sm">Song</p>
            <h1>{track.name}</h1>
            <p className="artistCrumb">
              <img
                src={track.artists[0].visuals.avatar[0].url}
                alt={track.artists[0].name}
                width="25"
              />
              <Link to={`/artist/${track.artists[0].id}`}>
                {track.artists[0].name}
              </Link>
              <span className="light">&nbsp;&#x2022;&nbsp;</span>
              <span id="albumLink">
                <Link to={`/artist/${track.artists[0].id}`}>
                  {track.album.name}
                </Link>
              </span>
              <span className="light">
                &nbsp;&#x2022; {track.durationText} &#x2022;&nbsp;
                {track.playCount.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
        <div id="info">
          <div id="actions">
            <button id="play" onClick={() => { setCurrentTrack(id) }}>
              <FontAwesomeIcon icon="fa-solid fa-play" />
            </button>
            <button id="like" onClick={() => { toggleLiked(track) }}>
              {saved[track.id] ? <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{ color: "#3be477", }} /> :
                <FontAwesomeIcon icon="fa-regular fa-heart" style={{ color: "inherit" }} />}
            </button>
          </div>
          <div id="contributors">
            {track.artists.map((e) => (
              <div className="artistTab" key={e.id}>
                <img src={e.visuals.avatar[1].url} alt={e.name} />
                <div>
                  <p>Artist</p>
                  <p><Link to={`/artist/${e.id}`}>{e.name}</Link></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
