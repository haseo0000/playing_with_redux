// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://moviesdatabase.p.rapidapi.com/",
  prepareHeaders: (headers) => {
    headers.set(
      "X-RapidAPI-Key",
      "4d87e33261msh634266b9ac496d7p1a33c7jsn64a5b44738eb"
    );

    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `titles`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMoviesQuery } = moviesApi;
