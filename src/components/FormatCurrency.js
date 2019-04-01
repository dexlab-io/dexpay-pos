import React from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';

import config from '../config';

const query = gql`
  {
    currency @client
  }
`;

const FormatCurrency = ({ value }) => {
  return (
    <Query query={query}>
      {({ data }) => {
        const selected = find(config.currencies, { id: data.currency });
        return currency(parseFloat(value), {
          symbol: `${selected.symbol || config.currency.symbol} `,
          formatWithSymbol: true
        }).format();
      }}
    </Query>
  );
};

FormatCurrency.defaultProps = {
  value: 0
};

FormatCurrency.propTypes = {
  value: PropTypes.number
};

export default FormatCurrency;
