import React, { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const clearTerm = () =>{
    setTerm("");
  }

  return (
    <nav>
      <Link to="/">
        <FontAwesomeIcon
          icon="fa-brands fa-spotify"
          style={{ color: "#ffffff" }}
        />
      </Link>
      <div className="midBar">
        <Link to="/">
          <FontAwesomeIcon
            icon="fa-solid fa-house"
            style={{ color: "#b3b3b3" }}
          />
        </Link>
        <div className="searchBox">
          {term && (
            <button id="clear" onClick={clearTerm}>
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                style={{ color: "inherit" }}
              />
            </button>
          )}
          <input
            id="searchTerm"
            type="text"
            placeholder="What do you want to play?"
            value={term}
            onChange={handleChange}
          />
          <button id="search">
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              style={{ color: "inherit" }}
            />
          </button>
        </div>
      </div>
      <div className="auth">
        <Link to="signup">
          <button className="signUp">Sign Up</button>
        </Link>
        <Link to="/signin">
          <button className="signIn">Log In</button>
        </Link>
      </div>
    </nav>
  );
}
