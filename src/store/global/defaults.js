export default {
  currency: 'EUR',
  acceptedTokens: ['xdai'],
  requiredConfirmations: [
    { token: 'xdai', confirmations: 2, __typename: 'Confirmation' },
    { token: 'dai', confirmations: 0, __typename: 'Confirmation' }
  ],
  walletAddress: null,
  walletAddressSource: null,
  exchangeRates: []
};
