import React, { useState } from "react";
import "./navBar.css";
import pokeballicon from "../../assets/images/pokeball-icon.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navRoutes = [
    {
      name: "Homepage",
      route: "/",
    },
    {
      name: "Pokemon",
      route: "/pokemon/cloyster",
    },
    {
      name: "Favorites",
      route: "/favorites",
    },
  ];

  return (
    <div className="navbar">
      <nav>
        <div className="block">
          <img className="block-img" src={pokeballicon} alt="pokeball icon" />
        </div>
        <div>
          <ul className="data-ul">
            {navRoutes.map(({ name, route }, index) => {
              return (
                <Link to={route} key={index}>
                  <li className="data-li">{name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
