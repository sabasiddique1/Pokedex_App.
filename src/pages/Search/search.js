import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialPokemonData } from "../../app/reducers/getInitialPokemonData";
import "./Search.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/loader";

const Search = ({ name }) => {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon.pokemonList);
  const isLoading = useSelector((state) => state.pokemon.isLoading);
  const error = useSelector((state) => state.pokemon.error);

  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [cardsPerPage]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  return (
    <div className="homepage-container">
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)}>First</button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <select
          value={cardsPerPage}
          onChange={(event) => setCardsPerPage(parseInt(event.target.value))}
        >
          {[12, 20, 30, 40].map((numCards) => (
            <option key={numCards} value={numCards}>
              {numCards} per page
            </option>
          ))}
        </select>
        <button
          disabled={
            currentPage === Math.ceil(pokemonList.length / cardsPerPage)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        <button
          onClick={() =>
            setCurrentPage(Math.ceil(pokemonList.length / cardsPerPage))
          }
        >
          Last
        </button>
      </div>
      <div className="pokemon-container-wrapper">
        <div className="pokemon-container">
          {pokemonList.slice(startIndex, endIndex).map(
            (pokemon) =>
              pokemon && (
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  key={pokemon.name}
                  className="pokemon-card"
                >
                  <img
                    className="pokemon-image"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokemon.url.split("/")[6]
                    }.png`}
                    alt={pokemon.name}
                  />
                  <span className="pokemon-name">{pokemon.name}</span>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
