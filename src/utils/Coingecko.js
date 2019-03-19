/* eslint import/prefer-default-export: 0 */

import axios from 'axios';
import config from '../config';

export const getTokenPrice = (token = 'ethereum') => {
  // console.log('currencies', config.currencies);
  const currencies = config.currencies.map(currency => {
    return currency.id.toLowerCase();
  });
  const currenciesString = currencies.join(',');

  return axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${currenciesString}`
    )
    .then(response => {
      return response.data[token];
    })
    .catch(() => 0);
};
