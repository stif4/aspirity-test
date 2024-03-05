import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './url';
import { ICharacter, ICharacterQuery, ICharacterResponse } from './types';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/character/`
  }),
  tagTypes: ['Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<ICharacter[], ICharacterQuery>({
      query({ page, name, status, species, type, gender }) {
        const getParams = () => {
          let query = `?page=${page}`;
          if (name) {
            query = `${query}&name=${name}`;
          }
          if (status) {
            query = `${query}&status=${status}`;
          }
          if (species) {
            query = `${query}&species=${species}`;
          }
          if (type) {
            query = `${query}&type=${type}`;
          }
          if (gender) {
            query = `${query}&gender=${gender}`;
          }
          return query;
        };
        return {
          url: getParams()
        };
      },
      transformResponse: async (characters: ICharacterResponse) => {
        return characters.results;
      }
    }),
    getCharacterById: builder.query<ICharacter, number>({
      query(id) {
        return {
          url: `${id}`
        };
      },
      providesTags: ['Character']
    })
  })
});
export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
