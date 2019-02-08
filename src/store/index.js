import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { fetchPosData, updatePosAddress } from './posData/queries';
import posData from './posData/resolvers';
import posType from './posData/schema';
import posDefaults from './posData/defaults';
import userData from './userData/resolvers';
import userType from './userData/schema';
import userDefaults from './userData/defaults';

const resolvers = mergeResolvers([posData, userData]);
const typeDefs = mergeTypes([posType, userType]);

const defaults = {
  ...posDefaults,
  ...userDefaults
};

/**
 * Store Manager:
 * Collects functions to be shared across the application to interact with the state
 *
 */
const store = {
  fetch: {
    pos: fetchPosData,
    /**
     * {StateSegment}Sub:
     * Automatically subscribe changes to the component state.
     */
    posSub: (context, key) => {
      fetchPosData().subscribe(result => {
        console.log('result', result);
        const ns = {};
        ns[key] = result.data.pos;
        context.setState(ns);
      });
    }
  },
  update: {
    pos: {
      address: updatePosAddress
    }
  }
};

export { resolvers, typeDefs, defaults, store };
