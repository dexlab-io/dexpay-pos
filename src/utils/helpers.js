import currency from 'currency.js';
import config from '../config';

export const formatCurrency = value => {
  return currency(parseFloat(value), {
    symbol: `${config.currency}`,
    formatWithSymbol: true
  }).format();
};

// Usage: await timeout(3000);
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
