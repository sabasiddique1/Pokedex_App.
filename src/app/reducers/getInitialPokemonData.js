
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonRoute } from "../../utils/Constants";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const { data } = await axios.get(pokemonRoute);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


