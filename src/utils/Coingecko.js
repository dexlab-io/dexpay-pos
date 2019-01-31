import axios from 'axios';

export const getTokenPrice = (token = 'ethereum') =>
  axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd,eur`
    )
    .then(response => {
      return response.data[token];
    })
    .catch(err => 0);
