import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion',
  async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
);

const initialState = {
  suggestion: null,
  loading: false,
  error: false,
};

const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (state, action) => {
      state.suggestion = action.payload.data;
      state.loading = false;
    },
    [fetchSuggestion.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  
});

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;

export default suggestionSlice.reducer;
