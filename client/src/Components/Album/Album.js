import React from "react";
import "./Album.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import meta from "./Meta";
import trackData from "./AlbumTracks";

const key = process.env.REACT_APP_RAPIDAPI_KEY;

export default function Album() {
  const { id } = useParams();
  const [albumMeta, setAlbumMeta] = useState("");
  const [album, setAlbum] = useState("");
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/album/metadata",
      params: {
        albumId: id,
      },
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
      },
    })
    .then((r) => {
      setAlbumMeta(r.data);
    })
    .catch((err) => {
        setAlbumMeta(meta);
        console.log(err);
      });
    axios({
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/album/tracks",
      params: {
        albumId: id,
      },
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
      },
    })
      .then((r) => {
        setAlbum(r.data);
      })
      .catch((err) => {
        setAlbum(trackData);
        // console.log(err);
      });
  }, [id]);
  return (
    albumMeta &&
    album && (
      <div id="album">
        <div id="head">
          <img src={albumMeta.cover[1].url} alt={albumMeta.name} />
          <div>
            <p className="sm">Album</p>
            <h1>{albumMeta.name}</h1>
            <p className="artistCrumb">
              <img
                src={albumMeta.artists[0].visuals.avatar[0].url}
                alt={albumMeta.artists[0].name}
                width="25"
              />
              <Link to={`/artist/${albumMeta.artists[0].id}`}>
                {albumMeta.artists[0].name}
              </Link>
            </p>
          </div>
        </div>
        <div id="tracks">
          <h2>Popular</h2>
          {album.tracks.items.map((val, ind) => (
            <div className="track" key={val.id}>
              <div className="serial">{ind + 1}</div>
              <div>
                <p className="trackName">
                  <Link to={`/track/${val.id}`}>{val.name}</Link>
                </p>
                <p className="artistList">
                  {val.artists.map((e, ind) => (
                    <Link to={`/artist/${e.id}`} key={e.id}>{`${e.name}${
                      ind + 1 === val.artists.length ? "" : ","
                    }`}</Link>
                  ))}
                </p>
              </div>
              <span className="duration">{val.durationText}</span>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
