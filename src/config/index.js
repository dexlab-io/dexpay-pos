export default {
  debug: process.env.NODE_ENV === 'development',
  ENABLE_LOGS: true,
  APP_VERSION: '0.0.1',
  siteName: 'Dexpay',
  siteUrl: 'https://dexpay.me',
  graphQlUri: 'https://dexpay-graphql.now.sh/',
  // graphQlUri: 'http://localhost:4000/',
  logo: '',
  fbAppID: '',
  twitter: '',
  posAddress: '',

  defaultHDpathEthereum: "m/44'/60'/0'/0/0", // Compatible with Jaxx, Metamask, Exodus, imToken, TREZOR (ETH) & Digital Bitbox
  confirmationNeeded: 1,
  networkProviders: {
    mainnet: {
      name: 'Ethereum (mainnet) by Infura',
      url: 'wss://mainnet.infura.io/_ws',
      provider: 'Infura',
      blockchain: 'Ethereum',
      network: 'mainnet',
      tokenEnabled: true
    },
    ropsten: {
      name: 'Ethereum (ropsten) by Infura',
      url: 'wss://ropsten.infura.io/_ws',
      provider: 'Infura',
      blockchain: 'Ethereum',
      network: 'ropsten',
      tokenEnabled: true
    },
    kovan: {
      name: 'Ethereum (kovan) by Infura',
      url: 'wss://kovan.infura.io/_ws',
      provider: 'Infura',
      blockchain: 'Ethereum',
      network: 'kovan',
      tokenEnabled: true
    }
  },
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
