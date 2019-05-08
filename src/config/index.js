export default {
  debug: process.env.NODE_ENV === 'development',
  APP_VERSION: '0.0.1',
  siteName: 'Dexpay',
  siteUrl: 'https://dexpay.me',
  graphQlUri: 'https://dexpay-graphql.now.sh/',
  // graphQlUri: 'http://localhost:4000/',
  logo: '',

  currencies: [
    { id: 'EUR', name: 'Euro', symbol: '€' },
    { id: 'USD', name: 'United States Dollar', symbol: '$' },
    { id: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { id: 'GBP', name: 'Pound sterling', symbol: '£' },
    { id: 'AUD', name: 'Australian dollar', symbol: 'A$' },
    { id: 'CAD', name: 'Canadian dollar', symbol: 'C$' },
    { id: 'CHF', name: 'Swiss franc', symbol: 'Fr' },
    { id: 'CNY', name: 'Renminbi', symbol: '元' }
  ]
};
