import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { findIndex } from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProductItem from './ProductItem';

const Container = styled.div``;

const Items = styled.div``;

const query = gql`
  {
    currency @client
    products {
      id
      title
      details
      price
      priceCurrency
      status
    }
  }
`;

class ProductItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    };
  }

  handleUpdateItem = (product, newValue) => {
    const { cartItems } = this.state;
    const { handleChange } = this.props;

    // check if item already there, then update
    const itemIndex = findIndex(cartItems, { id: product.id });
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      if (newValue === 0) {
        cartItems.splice(itemIndex, 1);
      } else {
        item.quantity = newValue;
        cartItems[itemIndex] = item;
      }
    } else {
      // else push to array
      cartItems.push({ ...product, quantity: newValue });
    }

    let cartTotal = 0;
    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      cartTotal += itemTotal;
    });

    this.setState({ cartItems });
    handleChange({ cartTotal: parseFloat(cartTotal).toFixed(2) });
  };

  render() {
    return (
      <Container>
        <Query query={query} fetchPolicy="cache-and-network">
          {({ data, loading, error }) => {
            if (loading && !data.products) return <p>loading...</p>;
            if (error) return <p>Please login to view products.</p>;
            // console.log('products', data.products);

            return (
              <Items>
                {data.products.map(item => (
                  <ProductItem
                    key={item.id}
                    product={item}
                    currency={data.currency}
                    handleUpdate={this.handleUpdateItem}
                  />
                ))}
              </Items>
            );
          }}
        </Query>
      </Container>
    );
  }
}

ProductItems.defaultProps = {
  handleChange: () => {}
};

ProductItems.propTypes = {
  handleChange: PropTypes.func
};

export default ProductItems;
