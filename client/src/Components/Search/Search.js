import React, { useState, useEffect } from "react";
import "./Search.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const key = process.env.REACT_APP_RAPIDAPI_KEY;

export default function Search() {
    const navigate = useNavigate();
    const { keyword } = useParams();
    const [results, setResults] = useState("");
    useEffect(() => {
        axios({
            method: "GET",
            url: "https://spotify-scraper.p.rapidapi.com/v1/search",
            params: {
                term: keyword,
                type: "all",
                limit: "10",
            },
            headers: {
                "x-rapidapi-key":
                    key,
                "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
            },
        })
            .then((r) => {
                setResults(r.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [keyword]);
    return (
        <div id="searchInnerWrapper">
            <h1>Results for "{keyword}"</h1>
			{results && (<>
            <h2>Artists</h2>
            <Splide
                aria-label="Artists"
                options={{
                    fixedWidth: "170px",
                    width: "100%",
                    perMove: 1,
                    pagination: false,
                }}
            >
                {results.artists &&
                    results.artists.items.map((ind) => (
                        <SplideSlide key={ind.id}>
                            <div
                                className="card artist"
                                onClick={() => navigate(`/artist/${ind.id}`)}
                            >
                                <img
                                    src={ind.visuals.avatar? ind.visuals.avatar[0].url:""}
                                    alt={ind.name}
                                />
                                <p>{ind.name}</p>
                                <p className="sub">Artist</p>
                            </div>
                        </SplideSlide>
                    ))}
            </Splide>
            <h2>Tracks</h2>
            <Splide
                aria-label="Tracks"
                options={{
                    fixedWidth: "170px",
                    width: "100%",
                    perMove: 1,
                    pagination: false,
                }}
            >
                {results.tracks && results.tracks.items.map((ind) => (
                    <SplideSlide key={ind.id}>
                        <div
                            className="card track"
                            onClick={() => navigate(`/track/${ind.id}`)}
                        >
                            <img src={ind.album.cover[1].url} alt={ind.name} />
                            <p>{ind.name}</p>
                            <p className="sub">{ind.artists[0].name}</p>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
            <h2>Albums</h2>
            <Splide
                aria-label="Albums"
                options={{
                    fixedWidth: "170px",
                    width: "100%",
                    perMove: 1,
                    pagination: false,
                }}
            >
                {results.albums &&
                    results.albums.items.map((ind) => (
                        <SplideSlide key={ind.id}>
                            <div className="card album">
                                <img
                                    src={ind.cover[1].url}
                                    alt={ind.name}
                                    onClick={() => navigate(`/album/${ind.id}`)}
                                />
                                <p>{ind.name}</p>
                                <p className="sub">{ind.artists[0].name}</p>
                            </div>
                        </SplideSlide>
                    ))}
            </Splide></>)}
        </div>
    );
}
