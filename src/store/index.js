import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
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

export { resolvers, typeDefs, defaults };
