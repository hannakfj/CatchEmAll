import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',                      
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }), 
  // Define endpoints
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit, offset }) => `pokemon?limit=${limit}&offset=${offset}`, // Add offset for pagination
    }),
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,             
    }),
  }),
});

// Export hooks generated by RTK Query
export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;