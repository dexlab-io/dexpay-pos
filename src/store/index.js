import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { fetchPosData, updatePosAddress, posQuery } from './posData/queries';
import { fetchInvoices, invoicesQuery } from './invoiceData/queries';

import invoiceData from './invoiceData/resolvers';
import invoiceType from './invoiceData/schema';
import invoiceDefaults from './invoiceData/defaults';

import posData from './posData/resolvers';
import posType from './posData/schema';
import posDefaults from './posData/defaults';
import userData from './userData/resolvers';
import userType from './userData/schema';
import userDefaults from './userData/defaults';

const resolvers = mergeResolvers([posData, userData, invoiceData]);
const typeDefs = mergeTypes([posType, userType, invoiceType]);

const defaults = {
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
