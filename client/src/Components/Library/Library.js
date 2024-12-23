import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Library.css";
import axios from "axios";

export default function Library({ user }) {
    const [saved, setSaved] = useState({});
    const [copyLink, setCopyLink] = useState("");

    const updateServerLib = async (data) => {
        try {
            const resp = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/user/auth/like`,
                { liked: data },
                { withCredentials: true }
            );
            console.log(resp);
        } catch (err) {
            console.error(err);
        }
    };
    const setLib = () => {
        const preSaved = localStorage.getItem("spotifyLibrary");
        const preSavedUser = localStorage.getItem("spotifyUserLibrary");
        console.log("From storage");
        if (preSavedUser) {
            setSaved(JSON.parse(preSavedUser));
            updateServerLib(JSON.parse(preSavedUser));
        } else if (preSaved) {
            setSaved(JSON.parse(preSaved));
        } else {
            setSaved({});
        }
    };
    useEffect(() => {
        window.addEventListener("storage", setLib);
        setLib();
    }, []);
    useEffect(() => {
        if (user) {
            console.log("From user");
            console.log(user);
            localStorage.setItem(
                "spotifyUserLibrary",
                user.liked ? JSON.stringify(user.liked) : "{}"
            );
            setCopyLink(user.playlist);
            setLib();
        }
    }, [user]);

    const handleShare = async () => {
        try {
            const id = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/user/auth/playlist`,
                {},
                { withCredentials: true }
            );
            setCopyLink(id.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/playlist/${copyLink}`
        );
        alert("Link copied");
    };
    return (
        <div id="libraryInnerWrapper">
            <div id="libTitle">
                <FontAwesomeIcon
                    icon="fa-solid fa-book"
                    style={{ color: "#b3b3b3" }}
                />
                <div>Your Library</div>
            </div>
            {user && Object.entries(saved).length ? (
                <div id="shareWrapper">
                    {copyLink ? (
                        <>
                            <span>Copy your custom link</span>
                            <button id="copy" onClick={handleCopy}>
                                <FontAwesomeIcon
                                    icon="fa-solid fa-copy"
                                    style={{ color: "inherit" }}
                                />
                            </button>
                        </>
                    ) : (
                        <button id="share" onClick={handleShare}>
                            Share your playlist
                        </button>
                    )}
                </div>
            ) : (
                ""
            )}
            <div id="libTitles">
                {saved &&
                    Object.entries(saved).map(([key, item], index) => (
                        <Link
                            to={`/track/${item.id}`}
                            className="libCard"
                            key={index}
                        >
                            <img
                                src={item.album.cover[0].url}
                                alt={item.name}
                            />
                            <div className="libCardText">
                                <p className="cardTitle">{item.name}</p>
                                <p className="cardArtists">
                                    {item.artists[0].name}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
