/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const ItemTitle = styled.a``;
const ItemIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;
const ItemRightIcon = styled.i`
  position: absolute;
  right: 2px;
`;

const items = [
  { id: 1, title: 'Update account', linkTo: '', icon: 'account-icon.png' },
  { id: 2, title: 'Shop Items', linkTo: '', icon: 'shop-icon.png' },
  { id: 3, title: 'Account Info & Password', linkTo: '', icon: 'key-icon.png' },
  { id: 4, title: 'Accepted Tokens', linkTo: '', icon: 'token-icon.png' },
  { id: 5, title: 'Wallet Address', linkTo: '', icon: 'wallet-icon.png' },
  { id: 6, title: 'Required Confirmations', linkTo: '', icon: 'link-icon.png' },
  { id: 7, title: 'Base Currency', linkTo: '', icon: 'currency-icon.png' }
];

const Settings = () => {
  return (
    <Layout header={{ isVisible: false }}>
      <Seo title="Settings" description="POS System" />
      <div className="section">
        <div className="container">
          <SettingsHeader />
          {items.map(item => (
            <NavItem key={item.id}>
              <ItemIcon
                alt={item.title}
                src={require(`../../assets/images/${item.icon}`)}
              />
              <ItemTitle>{item.title}</ItemTitle>
              <ItemRightIcon className="fas fa-angle-right" />
            </NavItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
