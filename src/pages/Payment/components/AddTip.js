import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trans } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const Title = styled.span`
  margin-right: 15px;
`;

const ItemContainer = styled.div`
  background-color: ${props => (props.active ? '#000000' : '#737373')};
  padding: 10px 17px 10px 17px;
  border-radius: 4px;
  margin: 6px 3px;
`;
const Text = styled.span`
  color: #ffffff;
`;

const tipOptions = [
  { id: 1, text: '15 %', value: 15 },
  { id: 2, text: '20 %', value: 20 },
  { id: 3, text: '30 %', value: 30 }
];

class AddTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  handleChange = value => {
    const { handleChange } = this.props;
    if (value === this.state.value) {
      this.setState({ value: 0 });
    } else {
      this.setState({ value });
    }
    handleChange(value);
  };

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Title>
          <Trans>Add a tip</Trans>
        </Title>
        {tipOptions.map(item => (
          <ItemContainer
            key={item.id}
            active={value === item.value}
            onClick={() => this.handleChange(item.value)}
          >
            <Text>{item.text}</Text>
          </ItemContainer>
        ))}
      </Container>
    );
  }
}

AddTip.defaultProps = {
  value: 0,
  handleChange: () => {}
};

AddTip.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func
};

export default AddTip;