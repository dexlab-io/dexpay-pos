import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import globalType from './global/schema';
import globalData from './global/resolvers';
import globalDefaults from './global/defaults';
import userData from './userData/resolvers';
import userType from './userData/schema';
import userDefaults from './userData/defaults';

const resolvers = mergeResolvers([globalData, userData]);
const typeDefs = mergeTypes([globalType, userType]);

const defaults = {
  ...globalDefaults,
  ...userDefaults
};

export { resolvers, typeDefs, defaults };
