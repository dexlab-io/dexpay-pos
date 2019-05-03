import gql from 'graphql-tag';
import { indexOf, findIndex, map } from 'lodash';
import Web3 from 'web3';
import swal from 'sweetalert';
import qs from 'qs';

import { getTokenPrice } from '../../utils/exchangeRates';

const fetchExchangeRates = async (_, variables, { cache }) => {
  // check if token already in store
  const data = cache.readQuery({
    query: gql`
      query AcceptedTokens {
        acceptedTokens @client
      }
    `
  });

  const exchangeRates = await new Promise(resolve => {
    const ratesPromise = data.acceptedTokens.map(async token => {
      const fiat = [];
      const prices = await getTokenPrice(token === 'xdai' ? 'dai' : token);
      map(prices, (price, currency) => {
        fiat.push({
          __typename: 'FiatRates',
          currency,
          price
        });
      });
      return { __typename: 'ExchangeRates', token, fiat };
    });
    Promise.all(ratesPromise).then(resultData => resolve(resultData));
  });

  // console.log('exchangeRates', exchangeRates);
  cache.writeData({
    data: { exchangeRates }
  });
};

const checkValidAddress = address => {
  const web3 = new Web3();
  const isValidAddress = web3.utils.isAddress(address);
  if (!isValidAddress) {
    // Provided Address is not a valid ethereum address
    swal(
      'Issue!',
      'Provided Address is not a valid ethereum address',
      'warning'
    );
  }
  return isValidAddress;
};

const resolvers = {
  Mutation: {
    initApp: async (_, variables, { cache }) => {
      const params = qs.parse(window.location.search.slice(1));
      if (params.posAddress && checkValidAddress(params.posAddress)) {
        cache.writeData({
          data: {
            walletAddress: params.posAddress,
            walletAddressSource: 'getQuery'
          }
        });
      }

      // check if logged in
      const token = window.localStorage.getItem('token');
      cache.writeData({
        data: { isLoggedIn: !!token }
      });

      // fetch exchange rates, every 12 seconds
      setInterval(() => {
        fetchExchangeRates(_, variables, { cache });
      }, 12000);

      return true;
    },
    updateCurrency: (_, variables, { cache }) => {
      // update cache
      cache.writeData({ data: { currency: variables.currency } });

      return variables.currency;
    },
    toggleAcceptedTokens: (_, variables, { cache }) => {
      const { token, isAccepted } = variables;

      const data = cache.readQuery({
        query: gql`
          query AcceptedTokens {
            acceptedTokens @client
          }
        `
      });
      const tokens = data.acceptedTokens;

      if (isAccepted) {
        tokens.push(token);
      } else {
        const tokenIndex = indexOf(tokens, token);
        tokens.splice(tokenIndex, 1);
      }
      // update cache
      cache.writeData({ data: { acceptedTokens: tokens } });

      return tokens;
    },
    updateAcceptedTokens: (_, variables, { cache }) => {
      const { tokens } = variables;

      // update cache
      cache.writeData({ data: { acceptedTokens: tokens } });

      return tokens;
    },
    updateRequiredConfirmations: (_, variables, { cache }) => {
      const data = cache.readQuery({
        query: gql`
          query RequiredConfirmations {
            requiredConfirmations @client {
              token
              confirmations
            }
          }
        `
      });
      const confirmations = data.requiredConfirmations;

      const selectedIndex = findIndex(confirmations, {
        token: variables.token
      });
      const selected = confirmations[selectedIndex];
      selected.confirmations = variables.confirmations;
      confirmations[selectedIndex] = selected;

      // update cache
      cache.writeData({
        data: { requiredConfirmations: confirmations }
      });

      return selected;
    },
    updateWalletAddress: (_, variables, { cache }) => {
      // update cache
      const { address, source } = variables;

      if (checkValidAddress(address)) {
        cache.writeData({
          data: {
            walletAddress: variables.address,
            walletAddressSource: source || 'manualInput'
          }
        });
      }
      return variables.address;
    },
    setRequiredConfirmations: (_, variables, { cache }) => {
      // console.log('setRequiredConfirmations', variables);
      // update cache
      cache.writeData({
        data: { requiredConfirmations: variables.requiredConfirmations }
      });
      return variables.requiredConfirmations;
    }
  }
};

export default resolvers;
