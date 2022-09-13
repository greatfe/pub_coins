const BASE_URL = 'https://api.coinpaprika.com/v1';
const COIN_BASE_URL = 'https://ohlcv-api.nomadcoders.workers.dev?';
//https://ohlcv-api.nomadcoders.workers.dev
//https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin
export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`)
        .then(response => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`)
        .then(response => response.json());
}

export async function fetchCoinTikers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`)
        .then(response => response.json());
}

export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now()/1000);
  const startDate = endDate - 60*60*24*7;
  return fetch(`${COIN_BASE_URL}coinId=${coinId}&start=${startDate}&end=${endDate}`)
        .then(response => response.json());
}
/* return fetch(`${COIN_BASE_URL}coinId=${coinId}&start=${startDate}&end=${endDate}`)
.then(response => response.json());
`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}&start=${startDate}&end=${endDate}`
 */
/* 
const temp = {
  "id":"btc-bitcoin",
  "name":"Bitcoin",
  "symbol":"BTC",
  "rank":1,
  "circulating_supply":19119012,
  "total_supply":19119012,
  "max_supply":21000000,
  "beta_value":0.950389,
  "first_data_at":"2010-07-17T00:00:00Z",
  "last_updated":"2022-08-12T00:28:30Z",
  "quotes":{
    "USD":{
      "price":23867.35013475038,
      "volume_24h":43537507743.77795,
      "volume_24h_change_24h":6.3,
      "market_cap":456320153634,
      "market_cap_change_24h":-1.39,
      "percent_change_15m":-0.05,
      "percent_change_30m":-0.48,
      "percent_change_1h":-0.3,
      "percent_change_6h":-1.56,
      "percent_change_12h":-3.58,
      "percent_change_24h":-1.39,
      "percent_change_7d":5.21,
      "percent_change_30d":18.65,
      "percent_change_1y":-46.09,
      "ath_price":68692.137036932,
      "ath_date":"2021-11-10T16:51:15Z",
      "percent_from_price_ath":-65.25
    }
  }
}

 */