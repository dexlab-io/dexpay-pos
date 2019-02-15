/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import styled from 'styled-components';

import { SwitchGroup } from '../../../components/elements';

const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const ItemName = styled.span`
  margin: 0 15px;
`;
const SwitchContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

class TokenItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAccepted: props.isAccepted
    };
  }

  handleChange = (token, isChecked) => {
    const { handleChange } = this.props;

    this.setState({ isAccepted: isChecked });
    handleChange(token, isChecked);
  };

  render() {
    const { token } = this.props;
    const { isAccepted } = this.state;

    return (
      <ItemContainer key={token.id}>
        <img
          src={require(`../../../assets/dummy/${token.image}`)}
          alt={token.name}
        />
        <ItemName className="has-text-weight-semibold">{token.name}</ItemName>
        <SwitchContainer>
          <SwitchGroup
            id={`isTokenAccepted-${token.id}`}
            name={`isTokenAccepted-${token.id}`}
            checked={isAccepted}
            onChange={checked => this.handleChange(token, checked)}
          />
        </SwitchContainer>
      </ItemContainer>
    );
  }
}

export default TokenItem;
