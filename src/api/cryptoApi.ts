import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'Content-Type': 'application/json',
  //'Access-Control-Allow-Origin': '*',
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

const coinGeckoBaseUrl = 'https://api.coingecko.com/api/v3/'

const createCoinGeckoRequest = (url: string) => ({
  url: `${coinGeckoBaseUrl}${url}`,
  method: 'GET'
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCoinGeckoId: builder.query({
      query: (ticker) => createCoinGeckoRequest(`/search?query=${ticker}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => {
        console.log(coinId)
        return createRequest(`/coin/${coinId}`)
      }
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCoinGeckoIdQuery,
  useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} = cryptoApi;