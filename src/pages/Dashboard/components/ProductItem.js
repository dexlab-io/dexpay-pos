import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NumberIncrementer } from '../../../components/elements';
import FormatCurrency from '../../../components/FormatCurrency';
import { getCurrencyRates } from '../../../utils/exchangeRates';

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

class ProductItem extends React.Component {
  constructor(props) {
    super(props);

    const { product } = props;
    this.state = {
      initValue: 0,
      price: product.price
    };
  }

  componentDidMount() {
    this.getPrice();
  }

  getPrice = async () => {
    const { price } = this.state;
    const { product, currency } = this.props;

    if (
      product.priceCurrency.length === 0 ||
      product.priceCurrency === currency
    ) {
      return this.setState({ price });
    }

    const toPrice = await getCurrencyRates(product.priceCurrency, currency);
    const newPrice = price * toPrice;
    return this.setState({ price: newPrice });
  };

  render() {
    const { initValue } = this.state;
    const { product, currency, handleUpdate } = this.props;

    return (
      <Item>
        <ItemName className="has-text-weight-semibold">
          {product.title}
        </ItemName>
        <ItemRight>
          <ItemPrice>
            <FormatCurrency currency={currency} value={product.price} />
          </ItemPrice>
          <ItemQuantitiy>
            <NumberIncrementer
              value={initValue}
              handleChange={newValue => handleUpdate(product, newValue)}
            />
          </ItemQuantitiy>
        </ItemRight>
      </Item>
    );
  }
}

ProductItem.defaultProps = {
  handleUpdate: () => {}
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func
};

export default ProductItem;
