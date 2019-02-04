import { timeout } from '../utils/helpers';
import { persistor } from '../utils/apolloClient';

const resolvers = {
  Mutation: {
    toggleOnline: (_, variables, { cache }) => {
      const { isOnline } = variables.input;
      // console.log('toggleIsLoggedIn', isLoggedIn);
      const data = {
        isOnline
      };
      // update local store
      cache.writeData({ data });
      return isOnline;
    },
    toggleLoggedIn: (_, variables, { cache }) => {
      const { isLoggedIn } = variables.input;
      const data = {
        isLoggedIn
      };
      // update local store
      cache.writeData({ data });
      return isLoggedIn;
    },
    login: async (_, variables, { cache }) => {
      const { email, password } = variables.input;
      console.log('email, password', email, password);

      // pass data to some API and wait for it, lets do setTimeout for now
      await timeout(2000);

      const user = {
        __typename: 'User',
        id: 2,
        fullName: 'John Doe',
        email: 'doe@john.com',
        currency: 'GBP'
      };

      // update cache
      cache.writeData({ data: { user, isLoggedIn: true } });

      return user;
    },
    logout: async (_, variables, { cache }) => {
      // update cache
      await cache.writeData({ data: { user: null, isLoggedIn: false } });
      await timeout(600);

      await persistor.purge();
      await timeout(600);

      window.localStorage.clear();
      await timeout(600);

      return true;
    }
  }
};

export default resolvers;
