import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import SettingsEmoji from './components/SettingsEmoji';
import settingsItems from './components/settingsItems';

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const ItemTitle = styled.span``;
const ItemRightIcon = styled.i`
  position: absolute;
  right: 2px;
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('token');
    this.state = {
      isLoggedIn: !!token
    };
  }

  render() {
    const { history } = this.props;
    const { isLoggedIn } = this.state;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Settings" description="POS System" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            {settingsItems.map(item => {
              if (!isLoggedIn && item.isPrivate) {
                return null;
              }
              return (
                <NavItem key={item.id} to={item.linkTo}>
                  <SettingsEmoji bgColor={item.bgColor} emoji={item.emoji} />
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemRightIcon className="fas fa-angle-right" />
                </NavItem>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Settings;
