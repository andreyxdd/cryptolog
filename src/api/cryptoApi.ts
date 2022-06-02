import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'x-access-token': process.env.REACT_APP_COINRANKING_API_KEY,
};

const proxyUrl = process.env.NODE_ENV === 'production' ? '' : 'https://cors-anywhere.herokuapp.com/';
const baseUrl = process.env.REACT_APP_COINRANKING_BASE_URL;

const createRequest = (url: string): any => ({
  url: `${proxyUrl}${baseUrl}${url}`,
  crossDomain: true,
  method: 'GET',
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
