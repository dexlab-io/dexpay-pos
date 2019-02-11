import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { withClientState } from 'apollo-link-state';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { defaults, resolvers, typeDefs } from '../store';

const cache = new InMemoryCache();
const debug = true;

export const persistor = new CachePersistor({
  cache,
  storage: window.localStorage,
  debug
});
persistor.restore();

const client = new ApolloClient({
  connectToDevTools: debug,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (debug) {
        console.log('onError', graphQLErrors, networkError);
      }
    }),
    withClientState({ resolvers, defaults, cache, typeDefs })
  ]),
  cache
});

// Purge persistor when the store was reset.
// client.onResetStore(() => persistor.purge());
// persistor.purge(); // clear local storage

export default client;
