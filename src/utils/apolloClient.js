import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { withClientState } from 'apollo-link-state';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import config from '../config';
import { defaults, resolvers, typeDefs } from '../store';

const cache = new InMemoryCache();

export const persistor = new CachePersistor({
  cache,
  storage: window.localStorage,
  debug: config.config
});

const httpLink = createHttpLink({
  uri: config.graphQlUri,
  credentials: 'same-origin'
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem('token');
  // console.log('token', token);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || ''
    }
  };
});

const client = new ApolloClient({
  connectToDevTools: config.debug,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (config.debug) {
        console.log('onError', graphQLErrors, networkError);
      }
    }),
    withClientState({
      resolvers,
      cache,
      defaults: window.localStorage.length === 0 ? defaults : undefined,
      typeDefs
    }),
    authLink.concat(httpLink)
  ]),
  cache
});

// Purge persistor when the store was reset.
// client.onResetStore(() => persistor.purge());
// persistor.purge(); // clear local storage

export default client;
