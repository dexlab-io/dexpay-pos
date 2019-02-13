import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';

const ItemContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  cursor: pointer;
  background-color: ${props => (props.active ? '#000' : '#fff')};
  > span {
    color: ${props => (props.active ? '#fff' : '#000')};
  }
`;

const currencies = [
  { id: 'EUR', name: 'Euro', symbol: '€' },
  { id: 'USD', name: 'United States Dollar', symbol: 'US$' },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { id: 'GBP', name: 'Pound sterling', symbol: '£' },
  { id: 'AUD', name: 'Australian dollar', symbol: 'A$' },
  { id: 'CAD', name: 'Canadian dollar', symbol: 'C$' },
  { id: 'CHF', name: 'Swiss franc', symbol: 'Fr' },
  { id: 'CNY', name: 'Renminbi', symbol: '元' }
];

class BaseCurrency extends React.Component {
  state = { activeCurrency: 'EUR' };

  handleCurrencyChange = currency => {
    this.setState({ activeCurrency: currency.id });
  };

  render() {
    const { history } = this.props;
    const { activeCurrency } = this.state;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Base Currency" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb
              history={history}
              title="Base Currency"
              icon="currency-icon.png"
            />
            {currencies.map(item => (
              <ItemContainer
                key={item.id}
                active={activeCurrency === item.id}
                onClick={() => this.handleCurrencyChange(item)}
              >
                <span>
                  {item.id} ({item.symbol}) {item.name}
                </span>
              </ItemContainer>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BaseCurrency;
