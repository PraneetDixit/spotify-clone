import React, { useEffect, useState } from "react";
import "./Playlist.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Playlist() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});
    useEffect(() => {
        if(id){
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/user/playlist/${id}`)
            .then((r) => {
                setPlaylist(r.data);
            })
            .catch((err) => console.error(err));
        }
    }, [id]);
    return (
        <div id="playlist">
            <div id="head">
                <div>
                    <p className="sm">Playlist</p>
                    <h1>{`${playlist.user}'s favorites`}</h1>
                </div>
            </div>
            <div id="tracks">
                {playlist &&(<>
                {Object.entries(playlist.liked).map(([key, val], ind) => (
                    <div className="track" key={key}>
                        <div className="serial">{ind + 1}</div>
                        <img
                            src={val.album.cover[0].url}
                            alt={val.name}/>
                        <div>
                            <p className="trackName">
                                <Link to={`/track/${key}`}>{val.name}</Link>
                            </p>
                            <p className="artistList">
                                {val.artists.map((e, ind) => (
                                    <Link to={`/artist/${e.id}`} key={e.id}>{`${
                                        e.name
                                    }${
                                        ind + 1 === val.artists.length
                                            ? ""
                                            : ","
                                    }`}</Link>
                                ))}
                            </p>
                        </div>
                        <span className="duration">{val.durationText}</span>
                    </div>
                ))}</>)}
            </div>
        </div>
    );
}
