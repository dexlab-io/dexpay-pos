export default {
  debug: process.env.NODE_ENV === 'development',
  ENABLE_LOGS: true,
  APP_VERSION: '0.2.12-b2',
  siteName: 'Dexpay',
  siteUrl: '',
  logo: '',
  fbAppID: '',
  twitter: '',
  posAddress: '0xd18a54f89603Fe4301b29EF6a8ab11b9Ba24f139',

  currency: {
    symbol: '€',
    id: 'eur'
  },

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
  }
};
