import gql from 'graphql-tag';
import { indexOf, findIndex } from 'lodash';

const resolvers = {
  Mutation: {
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
      // console.log('variables', variables);
      // update cache
      cache.writeData({
        data: { walletAddress: variables.address }
      });

      return variables.address;
    }
  }
};

export default resolvers;
