// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./Home.css";
import data from "../../Resp";
import { useNavigate } from "react-router-dom";

const key = process.env.REACT_APP_RAPIDAPI_KEY;

export default function Home () {

  const navigate = useNavigate();

  const [artistData, setArtistData] = useState("");
  const [albumData, setAlbumData] = useState("");
  useEffect(() => {
    //API request limit reached
    // axios({
    //   method: "GET",
    //   url: "https://spotify-scraper.p.rapidapi.com/v1/home",
    //   headers: {
    //     "x-rapidapi-key": key,
    //     "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
    //   },
    // })
    //   .then((r) => {
    //     setArtistData(r.data.sections.items[0].contents.items);
    //     setAlbumData(r.data.sections.items[1].contents.items);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setArtistData(data.sections.items[0].contents.items);
    setAlbumData(data.sections.items[1].contents.items);
  }, []);
  return (
    <div id="homeInnerWrapper">
      <h2>Popular artists</h2>
      <Splide
        aria-label="Popular artists"
        options={{
          fixedWidth: "170px",
          width: "100%",
          perMove: 1,
          pagination: false,
        }}
      >
        {artistData &&
          artistData.map((ind) => (
            <SplideSlide key={ind.id}>
              <div className="card artist" onClick={()=>navigate(`/artist/${ind.id}`)}>
                <img src={ind.visuals.avatar[0].url} alt={ind.name} />
                <p>{ind.name}</p>
                <p className="sub">Artist</p>
              </div>
            </SplideSlide>
          ))}
      </Splide>
      <h2>Trending albums</h2>
      <Splide
        aria-label="Trending albums"
        options={{
          fixedWidth: "170px",
          width: "100%",
          perMove: 1,
          pagination: false,
        }}
      >
        {albumData &&
          albumData.map((ind) => (
            <SplideSlide key={ind.id}>
              <div className="card album">
                <img src={ind.cover[1].url} alt={ind.name} onClick={()=>navigate(`/album/${ind.id}`)}/>
                <p>{ind.name}</p>
                <p className="sub">{ind.artists[0].name}</p>
              </div>
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
}
