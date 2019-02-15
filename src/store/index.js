import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import globalType from './global/schema';
import globalData from './global/resolvers';
import globalDefaults from './global/defaults';
import invoiceType from './invoiceData/schema';
import invoiceData from './invoiceData/resolvers';
import invoiceDefaults from './invoiceData/defaults';
import posData from './posData/resolvers';
import posType from './posData/schema';
import posDefaults from './posData/defaults';
import userData from './userData/resolvers';
import userType from './userData/schema';
import userDefaults from './userData/defaults';
import { fetchPosData, updatePosAddress, posQuery } from './posData/queries';
import { fetchInvoices, invoicesQuery } from './invoiceData/queries';

const resolvers = mergeResolvers([globalData, posData, userData, invoiceData]);
const typeDefs = mergeTypes([globalType, posType, userType, invoiceType]);

const defaults = {
  ...globalDefaults,
  ...posDefaults,
  ...userDefaults,
  ...invoiceDefaults
};

/**
 * Store Manager:
 * Collects functions to be shared across the application to interact with the state
 *
 */
const store = {
  queries: {
    pos: posQuery,
    invoices: invoicesQuery
  },
  fetch: {
    pos: fetchPosData,
    invoices: fetchInvoices,
    /**
     * {StateSegment}Sub:
     * Automatically subscribe changes to the component state.
     */
    posSub: (context, key) => {
      fetchPosData().subscribe(result => {
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
