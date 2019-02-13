/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import { SwitchGroup } from '../../components/elements';

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

const networksList = [
  { id: 1, name: 'Ether', image: 'crypto-icon.png' },
  { id: 2, name: 'DAI', image: 'crypto-icon.png' },
  { id: 3, name: 'xDAI', image: 'crypto-icon.png' },
  { id: 4, name: 'WBTC (comming soon)', image: 'crypto-icon.png' }
];

class AcceptedTokens extends React.Component {
  handleSwitch = item => {
    console.log('handleSwitch', item);
  };

  render() {
    const { history } = this.props;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Accepted Tokens" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb
              history={history}
              title="Accepted Tokens"
              icon="token-icon.png"
            />
            {networksList.map(item => (
              <ItemContainer key={item.id}>
                <img
                  src={require(`../../assets/dummy/${item.image}`)}
                  alt={item.name}
                />
                <ItemName className="has-text-weight-semibold">
                  {item.name}
                </ItemName>
                <SwitchContainer>
                  <SwitchGroup
                    checked="checked"
                    onChange={() => this.handleSwitch(item)}
                  />
                </SwitchContainer>
              </ItemContainer>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default AcceptedTokens;
