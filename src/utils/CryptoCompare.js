import axios from 'axios';

export const getHistohour = net =>
  axios
    .get(
      'https://min-api.cryptocompare.com/data/histohour?fsym=NEO&tsym=USD&limit=60&aggregate=3&e=CCCAGG',
    )
    .then(response => response.data.node);

/**
 * @function
 * @description
 * Hit the coinmarketcap api ticket to fetch the latest USD to NEO price
 *
 * @param {number} fiat - The current NEO amount in wallet
 * @return {string} - The converted NEO to USD fiat amount
 */
export const getTokenPrice = (fiat = 'USD', token = 'ethereum') =>
  axios
    .get(`https://api.coinmarketcap.com/v1/ticker/${token}/?convert=${fiat}`)
    .then(response => {
      const lastUSD = parseFloat(response.data[0].price_usd) || 0;
      return lastUSD;
    })
    .catch(err => 0);

export const coin2FIAT = (coinAmount, value) =>
  (value * coinAmount).toFixed(2).toString();
