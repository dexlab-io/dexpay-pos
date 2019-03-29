import React from 'react';
import PropTypes from 'prop-types';
import currencyjs from 'currency.js';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';

import config from '../config';

const query = gql`
  {
    currency @client
  }
`;

class FormatCurrency extends React.Component {
  loadCurrency(currency) {
    const { value } = this.props;

    const selected = find(config.currencies, { id: currency });
    if (!selected) {
      return parseFloat(value);
    }
    return currencyjs(parseFloat(value), {
      symbol: `${selected.symbol || config.currency.symbol} `,
      formatWithSymbol: true
    }).format();
  }

  render() {
    const { currency } = this.props;

    if (currency) {
      return this.loadCurrency(currency.toUpperCase());
    }

    return (
      <Query query={query}>
        {({ data }) => this.loadCurrency(data.currency)}
      </Query>
    );
  }
}

FormatCurrency.defaultProps = {
  value: 0,
  currency: undefined
};

FormatCurrency.propTypes = {
  value: PropTypes.number,
  currency: PropTypes.string
};

export default FormatCurrency;
