import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { findIndex } from 'lodash';

import { formatCurrency } from '../../../utils/helpers';
import { NumberIncrementer } from '../../../components/elements';

const Container = styled.div``;

const Items = styled.div``;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  align-items: center;
`;
const ItemRight = styled.div`
  display: flex;
  align-items: center;
`;
const ItemName = styled.span`
  font-size: 18px;
`;
const ItemPrice = styled.span`
  font-size: 18px;
`;
const ItemQuantitiy = styled.div`
  width: 120px;
  margin-left: 30px;
`;

const products = [
  { id: 1, name: 'Coffee', price: 3.2 },
  { id: 2, name: 'Cappuccino', price: 4.2 },
  { id: 3, name: 'Croissant', price: 1.8 },
  { id: 4, name: 'Avocado & Salmon Toas', price: 8.0 },
  { id: 5, name: 'Sparklin Water', price: 1.2 },
  { id: 6, name: 'Cheescake', price: 6.5 },
  { id: 7, name: 'Iced Tea', price: 2.8 }
];

class ProductItems extends React.Component {
  state = { cartItems: [] };

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
        <Items>
          {products.map(item => (
            <Item key={item.id}>
              <ItemName className="has-text-weight-semibold">
                {item.name}
              </ItemName>
              <ItemRight>
                <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
                <ItemQuantitiy>
                  <NumberIncrementer
                    handleChange={newValue =>
                      this.handleUpdateItem(item, newValue)
                    }
                  />
                </ItemQuantitiy>
              </ItemRight>
            </Item>
          ))}
        </Items>
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
