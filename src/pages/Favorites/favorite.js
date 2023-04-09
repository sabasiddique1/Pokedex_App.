import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleDeleteFavorite = (name) => {
    const newFavorites = favorites.filter((favorite) => favorite.name !== name);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const handleDeleteAllFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <section className="fav-container">
      <div className="button-container"></div>
      <h2>My Favorite Pokemons</h2>
      {favorites.length > 0 && (
        <button
          onClick={handleDeleteAllFavorites}
          className="delete-all-button"
        >
          Delete all favorites
        </button>
      )}
      <div className="favorites">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.name} className="card">
              <img src={favorite.avatar} alt={favorite.name} />
              <div className="card-body">
                <h3>{favorite.name}</h3>
                <p>Weight: {favorite.weight}</p>
                <p>Height: {favorite.height}</p>
                <div className="types">
                  {favorite.types.map((type, index) => (
                    <span
                      key={index}
                      className={`type-${index}`}
                      style={{
                        backgroundColor:
                          typeColors[type.type.name.toLowerCase()],
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <div className="buttons-container">
                  <Link
                    to={`/pokemon/${favorite.name}`}
                    className="view-button"
                  >
                    View Description
                  </Link>
                  <button
                    onClick={() => handleDeleteFavorite(favorite.name)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )
 : (
          <p>You have no favorites yet.</p>
        )}
      </div>
    </section>
  );
};

export default Favorites;
