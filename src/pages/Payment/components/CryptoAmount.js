import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';

import cryptoIcon from '../../../assets/dummy/crypto-icon.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;
const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  margin-right: 12px;
  width: 32px;
  height: 32px;
`;

const InnerSelect = styled.div`
  position: relative;
  border: 1px solid #383838;
  border-radius: 4px;
  max-width: 265px;
  padding-top: 14px;
  padding-bottom: 7px;
  margin: 0 auto;
`;

const SelectIcon = styled.i`
  position: absolute;
  top: 22px;
  right: 22px;
`;

const options = [
  { value: 'dai', label: 'Dai' },
  { value: 'eth', label: 'Ethereum' }
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
        <span>{selectedCrypto.toUpperCase()}&nbsp;</span>
        <span className="has-text-weight-light">
          {cryptoValue[selectedCrypto.toLowerCase()]}
        </span>
      </Container>
    );

    if (hasSelection) {
      return (
        <SelectContainer>
          <div style={{ width: '280px' }}>
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
                <SelectIcon className="fas fa-angle-down" />
              </InnerSelect>
            )}
          </div>
        </SelectContainer>
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
