import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const newFavorite = action.payload;
      const existingFavorite = state.find(favorite => favorite.name === newFavorite.name);
      if (!existingFavorite) {
        state.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const removedFavorite = action.payload;
      const index = state.findIndex(favorite => favorite.name === removedFavorite.name);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    }
  }
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
