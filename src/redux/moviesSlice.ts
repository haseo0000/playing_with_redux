import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type MoviesT = {
  id: string;
  primaryImage: {
    width: number;
    height: number;
    url: string;
    caption: string;
  };
  titleText: string;
  releaseYear: number;
};

type InitialStateT = {
  movies: MoviesT[];
  loading: boolean;
};

const initialState: InitialStateT = {
  movies: [],
  loading: true,
};

const refactorData = (data: any): MoviesT[] => {
  const newList: MoviesT[] = data.results.map((item: any) => ({
    id: item.id,
    primaryImage: {
      width: item.primaryImage?.width,
      height: item.primaryImage?.height,
      url: item.primaryImage?.url,
      caption: item.primaryImage?.caption?.plainText,
    },
    titleText: item.titleText.text,
    releaseYear: item.releaseYear.year,
  }));

  return newList;
};

export const fetchMoviesList = createAsyncThunk(
  "fetchMoviesList",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://moviesdatabase.p.rapidapi.com/titles", {
        headers: {
          "X-RapidAPI-Key": "4d87e33261msh634266b9ac496d7p1a33c7jsn64a5b44738eb",
        },
        signal: thunkAPI.signal,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const moviesSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    getAllMovies: (state: InitialStateT, action: PayloadAction) => {
      state.movies = refactorData(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesList.pending, (state, action) => {
        console.log("pending : ", action.type);
        state.loading = true;
      })
      .addCase(fetchMoviesList.fulfilled, (state, action) => {
        console.log("fulfilled : ", action.type);
        state.movies = refactorData(action.payload);
        state.loading = false;
      })
      .addCase(fetchMoviesList.rejected, (state, action) => {
        console.log("rejected : ", action.type);
        state.loading = false;
      });
  },
});

export const { getAllMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
