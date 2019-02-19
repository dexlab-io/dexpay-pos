import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  border: 1px solid #222222;
  border-radius: 4px;
  height: 40px;
  width: max-content;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
`;
const Left = styled(Box)`
  font-size: 24px;
  font-weight: 400;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;
const Center = styled(Box)`
  font-size: 18px;
`;
const Right = styled(Left)``;

class NumberIncrementer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { counter: props.value };
  }

  handleChange = type => {
    const { counter } = this.state;
    const { handleChange } = this.props;

    let newValue = counter;
    if (type === 'plus' && counter < 500) {
      newValue = counter + 1;
    } else if (type === 'minus' && counter > 0) {
      newValue = counter - 1;
    }

    this.setState({ counter: newValue });
    handleChange(newValue);
  };

  render() {
    const { counter } = this.state;

    return (
      <Container>
        <Left onClick={() => this.handleChange('minus')}>-</Left>
        <Center>{counter}</Center>
        <Right onClick={() => this.handleChange('plus')}>+</Right>
      </Container>
    );
  }
}

NumberIncrementer.defaultProps = {
  value: 0,
  handleChange: () => {}
};

NumberIncrementer.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func
};

export default NumberIncrementer;
