export default {
  DEV_MOVE: true,
  ENABLE_LOGS: true,
  APP_VERSION: "0.2.12-b2",
  defaultHDpathEthereum: "m/44'/60'/0'/0/0", // Compatible with Jaxx, Metamask, Exodus, imToken, TREZOR (ETH) & Digital Bitbox
  confirmationNeeded: 1,
  networkProviders: {
    'mainnet': {
      name: 'Ethereum (mainnet) by Infura',
      url: 'wss://mainnet.infura.io/_ws',
      provider: 'Infura',
      blockchain: 'Ethereum',
      network: 'mainnet',
      tokenEnabled: true,
    },
    'ropsten': {
      name: 'Ethereum (ropsten) by Infura',
      url: 'wss://ropsten.infura.io/_ws',
      provider: 'Infura',
      blockchain: 'Ethereum',
      network: 'ropsten',
      tokenEnabled: true,
    },
    'kovan': {
      name: 'Ethereum (kovan) by Infura',
      url: 'wss://kovan.infura.io/_ws',
      provider: 'Infura',
      blockchain: 'Ethereum',
      network: 'kovan',
      tokenEnabled: true,
    },
  }
};
