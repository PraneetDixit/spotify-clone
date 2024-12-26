import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {
    let navigate = useNavigate();
    const [term, setTerm] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const handleChange = (e) => {
        setTerm(e.target.value);
    };

    const clearTerm = () => {
        setTerm("");
    };

    const handleSearch = () => {
        if (term.trim()) {
            navigate(`/search/${term}`);
            clearTerm();
        }
    };

    const handleKeyDown = (key) => {
        if (key === "Enter") {
            handleSearch();
        }
    };

    return (
        <nav>
            <Link to="/">
                <FontAwesomeIcon
                    icon="fa-solid fa-music"
                    style={{ color: "#ff4d4d" }}
                />
            </Link>
            <div className="midBar">
                <Link to="/">
                    <FontAwesomeIcon
                        icon="fa-solid fa-house"
                        style={{ color: "#333" }}
                    />
                </Link>
                <div className="searchBox">
                    {term && (
                        <button id="clear" onClick={clearTerm}>
                            <FontAwesomeIcon
                                icon="fa-solid fa-xmark"
                                style={{ color: "#333" }}
                            />
                        </button>
                    )}
                    <input
                        id="searchTerm"
                        type="text"
                        placeholder="What do you want to play?"
                        value={term}
                        onChange={handleChange}
                        onKeyUp={(e) => {
                            handleKeyDown(e.key);
                        }}
                    />
                    <button id="search" onClick={handleSearch}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-magnifying-glass"
                            style={{ color: "#333" }}
                        />
                    </button>
                </div>
            </div>
            <div className="auth">
                {user ? (
                    <div className="userWidget">
                        <div className="avatar" onClick={() => setShowOptions(!showOptions)}>
                            {user.username.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="userActions" style={showOptions ? { display: "block" } : { display: "none" }}>
                            <div className="tab">{user.username}</div>
                            <div className="tab" onClick={logout}>
                                Log Out
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to="signup">
                            <button className="signUp">Sign Up</button>
                        </Link>
                        <Link to="/signin">
                            <button className="signIn">Log In</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
