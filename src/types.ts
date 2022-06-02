export type IGlobalStats = {
  total?: number;
  totalExchanges?: number;
  totalMarketCap?: number;
  total24hVolume?: number;
  totalMarkets?: number;
}

export type ICrypto = {
  name: string;
  rank: number;
  uuid: string;
  iconUrl: string;
  price: number;
  marketCap: number;
  change: number;
}

export type ICryptoDetails = {
  price?: number;
  rank?: number;
  volume?: number;
  marketCap?: number;
  symbol?: string;
  name?: string;
  numberOfMarkets?: number;
  numberOfExchanges?: number;
  allTimeHigh?: { price?: number };
  supply?: {confirmed?: boolean, total?: number, circulating?: number };
  description?: string;
  links?: Array<string>;
}
