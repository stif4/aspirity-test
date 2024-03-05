import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './url';
import { ILocation, ILocationQuery, ILocationResponse } from './types';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/location/`
  }),
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    getLocations: builder.query<ILocation[], ILocationQuery>({
      query({ page, name, type, dimension }) {
        const getParams = () => {
          let query = `?page=${page}`;
          if (name) {
            query = `${query}&name=${name}`;
          }
          if (type) {
            query = `${query}&type=${type}`;
          }
          if (dimension) {
            query = `${query}&dimension=${dimension}`;
          }
          return query;
        };
        return {
          url: getParams()
        };
      },
      transformResponse: async (locations: ILocationResponse) => {
        return locations.results;
      }
    }),
    getLocationById: builder.query<ILocation, number>({
      query(id) {
        return {
          url: `${id}`
        };
      },
      providesTags: ['Location']
    })
  })
});
export const { useGetLocationsQuery, useGetLocationByIdQuery } = locationApi;
