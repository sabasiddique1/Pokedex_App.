import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../components/hooks/hooks";
import Loader from "../../components/Loader/loader";
import Message from "../../components/message/message";
import "./pokemon.css";

const Pokemon = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false); // added state to check if already added
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
  const { pokemon } = useParams();

  const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const { data, err } = useFetch(pokeApi);

  useEffect(() => {
    setLoading(true);
    if (data) {
      setLoading(false);
      setPokemonData(data);
    }
    if (err) {
      setLoading(false);
      setError(err.err);
    }
  }, [data, err]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyAdded = favorites.some(
      (favorite) => favorite.name === pokemonData?.name
    );
    setIsAlreadyAdded(isAlreadyAdded);
  }, [pokemonData]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isAlreadyAdded) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.name !== pokemonData?.name
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsAlreadyAdded(false);
    } else {
      const newFavorite = {
        name: pokemonData?.name,
        avatar: pokemonData?.sprites?.other?.dream_world?.front_default,
        weight: pokemonData?.weight,
        height: pokemonData?.height,
        types: pokemonData?.types,
        abilities: pokemonData?.abilities,
        stats: pokemonData?.stats,
      };
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, newFavorite])
      );
      setIsAlreadyAdded(true);
    }
  };

  return (
    <section className="container">
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status} ${error.statusText}`}
          bgColor="#dc3545"
        />
      )}
      {pokemonData && (
        <div>
          <div className="result-container">
            <div className="details-container">
              <div className="name-container">{pokemonData.name}</div>
              <div className="height-container">
                <b>Height: &nbsp;</b>
                {pokemonData.height} m
              </div>
              <div className="weight-container">
                <b>Weight: &nbsp;</b>
                {pokemonData.weight} kg
              </div>
            </div>
            <div className="image-container">
              <img
                src={pokemonData.sprites.other.dream_world.front_default}
                alt={pokemonData.name}
              />
            </div>
            <div className="type-box">
              {pokemonData.types.map((type, index) => (
                <span
                  key={index}
                  className="type-box"
                  style={{
                    backgroundColor: typeColors[type.type.name.toLowerCase()],
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            <div className="stats-container">
              {pokemonData.stats.map((stat, index) => (
                <div className="stat-box" key={index}>
                  <div className="stat-name">{stat.stat.name}</div>
                  <div className="stat-progress">
                    <div
                      className={`stat-progress-bar ${
                        stat.base_stat > 75
                          ? "high"
                          : stat.base_stat > 50
                          ? "medium"
                          : "low"
                      }`}
                      style={{ width: `${stat.base_stat}%` }}
                    >
                      <span className="stat-progress-label">
                        {stat.base_stat}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isAlreadyAdded ? (
            <Message msg="Added to favorites!" />
          ) : addedToFavorites ? (
            <Message msg="Added to favorites!" />
          ) : (
            <button
              onClick={handleAddToFavorites}
              className="add-to-favorites-button"
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: "30px", height: "30px", fill: "white" }}
              >
                <path d="M12 21.35l-1.45-1.32C4.92 14.39 2 11.23 2 7.77 2 5.8 3.16 4.16 4.62 3.34c1.46-.82 3.1-.82 4.56 0L12 6.69l2.82-2.35c1.46-.82 3.1-.82 4.56 0 1.46.82 2.62 2.46 2.62 4.43 0 3.46-2.92 6.62-8.55 12.26L12 21.35z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Pokemon;
