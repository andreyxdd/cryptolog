import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': '45552abf68mshe418f99c7e18f66p1a063fjsne4fd35f3253c',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

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
