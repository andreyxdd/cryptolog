import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'x-access-token':'coinranking905ab4547db0d22ac12475152245f36814bf6182bff1e321'
}

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://api.coinranking.com/v2';

const createRequest = (url: string) => ({
  url: `${proxyUrl}${baseUrl}${url}`,
  crossDomain: true,
  method: 'GET',
  headers: cryptoApiHeaders
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
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetExchangesQuery, useGetCryptoHistoryQuery } = cryptoApi;