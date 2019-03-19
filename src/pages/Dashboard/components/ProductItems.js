import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { findIndex } from 'lodash';

import { NumberIncrementer } from '../../../components/elements';
import FormatCurrency from '../../../components/FormatCurrency';

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
  { id: 1, name: '🍺 Beer', price: 2.0 },
  { id: 2, name: '🍷 Wine', price: 2.0 },
  { id: 3, name: '🥤 Soft drink', price: 1.0 }
];

class ProductItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      initValue: 0
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

  resetItems() {
    // to reset counter for all items
    this.setState({ cartItems: [], initValue: 1 });
    setTimeout(() => {
      this.setState({ initValue: 0 });
    }, 2000);
  }

  render() {
    const { initValue } = this.state;

    return (
      <Container>
        <Items>
          {products.map(item => (
            <Item key={item.id}>
              <ItemName className="has-text-weight-semibold">
                {item.name}
              </ItemName>
              <ItemRight>
                <ItemPrice>
                  <FormatCurrency value={item.price} />
                </ItemPrice>
                <ItemQuantitiy>
                  <NumberIncrementer
                    value={initValue}
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
