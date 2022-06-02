import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': process.env.REACT_APP_BINGONEWS_BASE_STRING,
  'X-RapidAPI-Key': process.env.REACT_APP_BINGONEWS_API_KEY,
};

const baseUrl = process.env.REACT_APP_BINGONEWS_BASE_URL;

const createRequest = (url: string): any => ({
  url,
  method: 'GET',
  headers: cryptoNewsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(
        `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
      ),
    }),
  }),
});

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi;
