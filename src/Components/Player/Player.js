import React, { useEffect, useState } from "react";
import "./Player.css";
import axios from "axios";
import track from "./Track";
import AudioPlayer from "react-modern-audio-player";

export default function Player(props) {
  const [trackInfo, setTrackInfo] = useState(null);
  useEffect(() => {
    if (props.currentTrack) {
      //API request limit
          axios
            .request({
              method: "GET",
              url: "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud",
              params: {
                track: props.currentTrack,
        quality: "sq"
              },
              headers: {
                "x-rapidapi-key":
                  "c456acda40msh012159dc2abc3c9p1bbeb1jsn33ef9596085f",
                "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
              },
            })
            .then((r) => {
              setTrackInfo(r.data);
            })
            .catch((err) => {
              console.log(err);
            });
      // setTrackInfo(track);
    }
  }, [props.currentTrack]);
  const [playlist, setPlaylist]=useState(null);
  const [i, setI]=useState(1);
  // const playlist = [];
  useEffect(() => {
    if (trackInfo) {
      if(playlist){
      setPlaylist([
        ...playlist,
        {
            name: trackInfo.spotifyTrack.name,
            writer: trackInfo.spotifyTrack.artists[0].name,
            img: trackInfo.spotifyTrack.album.cover[0].url,
            src: trackInfo.soundcloudTrack.audio[0].url,
            id: i,
          }
      ]);}else{
        setPlaylist([
          {
              name: trackInfo.spotifyTrack.name,
              writer: trackInfo.spotifyTrack.artists[0].name,
              img: trackInfo.spotifyTrack.album.cover[0].url,
              src: trackInfo.soundcloudTrack.audio[0].url,
              id: i,
            }
        ]);
      }
      setI(i+1);
      // playlist.push({
      //   name: trackInfo.spotifyTrack.name,
      //   writer: trackInfo.spotifyTrack.artists[0].name,
      //   img: trackInfo.spotifyTrack.album.cover[0].url,
      //   src: trackInfo.soundcloudTrack.audio[0].url,
      //   id: i,
      // });
      // i++;
    }
  }, [trackInfo]);
  return (
    playlist && 
    <div id="player">
      <AudioPlayer playList={playlist} activeUI={{playButton: true, volume: true, progress: "bar", trackInfo: true, trackTime: true, artwork: true, prevNnext: true}} placement={{artwork: "row1-1",
    trackInfo: "row1-2",
    trackTimeCurrent: "row1-5",
    trackTimeDuration: "row1-6",
    progress: "row1-7",
    volume: "row1-4",
    playButton: "row1-3"}}/>
    </div>
  );
}
