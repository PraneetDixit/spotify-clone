import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "./Root.css";
import Library from "./Components/Library/Library";
import { Outlet } from "react-router-dom";
import Player from "./Components/Player/Player";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Root() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [user, setUser] = useState(null);

    const logout = async () => {
        try {
            const resp = await axios.post(`${SERVER_URL}/user/logout`,{}, {
                withCredentials: true,
            });
            console.log(resp);
            setUser(null);
            localStorage.removeItem("spotifyUserLibrary");
            window.dispatchEvent(new Event("storage"));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        async function getUser() {
            try {
                const resp = await axios.get(`${SERVER_URL}/user/auth/`, {
                    withCredentials: true,
                });
                console.log(resp);
                setUser(resp.data);
            } catch (err) {
                console.error(err);
            }
        }
        getUser();
    }, []);

    return (
        <>
            <div id="container">
                <Navbar user={user} logout={logout} />
                <div id="body">
                    <div id="libraryWrapper">
                        <Library user={user} />
                    </div>
                    <div id="routeWrapper">
                        <Outlet context={[setCurrentTrack]} />
                    </div>
                </div>
                <div id="playerWrapper">
                    <Player currentTrack={currentTrack} />
                </div>
            </div>
        </>
    );
}
