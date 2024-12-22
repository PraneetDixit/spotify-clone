import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Artist.css";
import { Link, useParams } from "react-router-dom";
import data from "./Resp";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState("");
  useEffect(() => {
    //API request limit reached
    axios({
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/artist/overview",
      params: {
        artistId: id
      },
      headers: {
        "x-rapidapi-key": "c456acda40msh012159dc2abc3c9p1bbeb1jsn33ef9596085f",
        "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
      },
    })
      .then((r) => {
        setArtist(r.data);
      })
      .catch((err) => {
        setArtist(data);
      });
  }, [id]);
  return (
    artist && (<div id="artist">
        <div id="head">
            <img src={artist.visuals.avatar[1].url} alt={artist.name} />
            <div>
                <h1>{artist.name}</h1>
                <p>{artist.stats.monthlyListeners.toLocaleString()} monthly listeners</p>
            </div>
        </div>
        <div id="tracks">
            <h2>Popular</h2>
            {artist.discography.topTracks.map((val, ind)=>(
                <div className="track" key={val.id}>
                    <div className="serial">{ind+1}</div>
                    <img src={val.album.cover[0].url} alt={val.name} width="40"/>
                    <p className="trackName">
                        <Link to={`/track/${val.id}`}>
                        {val.name}
                        </Link>
                    </p>
                    <span className="plays">{val.playCount.toLocaleString()}</span>
                    <span className="duration">{val.durationText}</span>
                </div>
            ))}
        </div>
    </div>)
);
}
