
import { createSlice } from "@reduxjs/toolkit";
import { getInitialPokemonData} from "../reducers/getInitialPokemonData";

const initialState = {
  pokemonList: [],
  pokemonWithImages: [],
  isLoading: false,
  error: null,
};

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getInitialPokemonData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getInitialPokemonData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.pokemonList = action.payload.results;
        })
        .addCase(getInitialPokemonData.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        
    },
  });
  
  export const {} = pokemonSlice.actions;
