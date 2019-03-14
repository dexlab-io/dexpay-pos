import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';

import cryptoIcon from '../../../assets/dummy/crypto-icon.png';

const Wrapper = styled.div`
  padding: 10px 75px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 130px;
  margin: 8px auto;
`;

const Image = styled.img`
  margin-right: 12px;
  width: 32px;
  height: 32px;
`;

const InnerSelect = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SelectIcon = styled.div``;

const options = [
  { value: 'dai', label: 'xDai' }
  // { value: 'eth', label: 'Ethereum' }
];

class CryptoAmount extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedCrypto: props.cryptoCurrency, selectOpen: false };
  }

  handleChange = option => {
    const { handleChange } = this.props;
    this.setState({ selectedCrypto: option.value, selectOpen: false });
    handleChange(option);
  };

  render() {
    const { cryptoValue, hasSelection } = this.props;
    const { selectOpen, selectedCrypto } = this.state;

    const activeItem = (
      <Container>
        <Image src={cryptoIcon} alt={selectedCrypto} />
        <span>x{selectedCrypto.toUpperCase()}&nbsp;</span>
        <span className="has-text-weight-light">
          {cryptoValue[selectedCrypto.toLowerCase()]}
        </span>
      </Container>
    );

    if (hasSelection) {
      return (
        <Wrapper>
          {selectOpen ? (
            <Select
              value={selectedCrypto}
              onChange={this.handleChange}
              options={options}
              menuIsOpen={selectOpen}
            />
          ) : (
            <InnerSelect
              onClick={() => this.setState({ selectOpen: !selectOpen })}
            >
              {activeItem}
              <SelectIcon>
                <i className="fas fa-angle-down" />
              </SelectIcon>
            </InnerSelect>
          )}
        </Wrapper>
      );
    }

    return activeItem;
  }
}

CryptoAmount.defaultProps = {
  cryptoValue: { dai: 0, eth: 0 },
  hasSelection: false,
  cryptoCurrency: 'DAI',
  handleChange: () => {}
};

CryptoAmount.propTypes = {
  cryptoValue: PropTypes.object,
  hasSelection: PropTypes.bool,
  cryptoCurrency: PropTypes.string,
  handleChange: PropTypes.func
};

export default CryptoAmount;
