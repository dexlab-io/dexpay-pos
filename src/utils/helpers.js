import currency from 'currency.js';
import config from '../config';

export const formatCurrency = value => {
  return currency(parseFloat(value), {
    symbol: `${config.currency.symbol} `,
    formatWithSymbol: true
  }).format();
};

// Usage: await timeout(3000);
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const truncateHash = (hash, length = 22) => {
  const startHash = hash.substring(0, length);
  const lastHash = hash.substr(hash.length - 4);
  return `${startHash}...${lastHash}`;
};
