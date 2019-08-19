export default {
  debug: process.env.NODE_ENV === 'development',
  ENABLE_LOGS: true,
  APP_VERSION: '0.0.1',

  defaultHDpathEthereum: "m/44'/60'/0'/0/0", // Compatible with Jaxx, Metamask, Exodus, imToken, TREZOR (ETH) & Digital Bitbox
  confirmationNeeded: 1,
};

