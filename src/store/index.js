import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import globalType from './global/schema';
import globalData from './global/resolvers';
import globalDefaults from './global/defaults';
import invoiceType from './invoiceData/schema';
import invoiceData from './invoiceData/resolvers';
import invoiceDefaults from './invoiceData/defaults';
import userData from './userData/resolvers';
import userType from './userData/schema';
import userDefaults from './userData/defaults';

const resolvers = mergeResolvers([globalData, userData, invoiceData]);
const typeDefs = mergeTypes([globalType, userType, invoiceType]);

const defaults = {
  ...globalDefaults,
  ...userDefaults,
  ...invoiceDefaults
};

export { resolvers, typeDefs, defaults };
