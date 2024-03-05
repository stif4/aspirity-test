import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './url';
import { IEpisode, IEpisodeQuery, IEpisodeResponse } from './types';

export const episodeApi = createApi({
  reducerPath: 'episodeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/episode/`
  }),
  tagTypes: ['Episode'],
  endpoints: (builder) => ({
    getEpisode: builder.query<IEpisode[], IEpisodeQuery>({
      query({ page, name, episode }) {
        const getParams = () => {
          let query = `?page=${page}`;
          if (name) {
            query = `${query}&name=${name}`;
          }
          if (episode) {
            query = `${query}&episode=${episode}`;
          }
          return query;
        };
        return {
          url: getParams()
        };
      },
      transformResponse: async (episodes: IEpisodeResponse) => {
        return episodes.results;
      }
    }),
    getEpisodeById: builder.query<IEpisode, number>({
      query(id) {
        return {
          url: `${id}`
        };
      },
      providesTags: ['Episode']
    })
  })
});
export const { useGetEpisodeQuery, useGetEpisodeByIdQuery } = episodeApi;
