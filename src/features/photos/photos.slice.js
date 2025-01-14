import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter(photo => photo.id !== action.payload);
    },    
    }
  };

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const photos = selectAllPhotos(state);
  const searchTerm = selectSearchTerm(state);
  const filteredPhotos = photos.filter((photo) => photo.caption.toLowerCase().includes(searchTerm.toLowerCase()));
  return filteredPhotos;
};
