import React, { Component } from 'react';
import qs from 'qs';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './theme/bulma.css'; // load bulma
import './localization'; // load i18n
import apolloClient from './utils/apolloClient';
import theme, { GlobalStyle } from './theme'; // load custom theme
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
import {
  Error404,
  Dashboard,
  Settings,
  AccountInfo,
  AcceptedTokens,
  BaseCurrency,
  RequiredConfirmations,
  WalletAddress,
  Test
} from './pages';

import { store } from './store';

class App extends Component {
  async componentDidMount() {
    await this.init();
  }

  async init() {
    const params = qs.parse(window.location.search.slice(1));
    this.wallet = new EthereumHDWallet();
    await this.wallet.setWeb3();

    if (this.wallet.getAddress()) {
      store.update.pos.address(
        this.wallet.getAddress(),
        null,
        'Injected Provider'
      );
    } else if (!this.wallet.getAddress() && params.posAddress) {
      store.update.pos.address(params.posAddress, null, 'GET');
    } else {
      store.update.pos.address(null, 'Pos address is empty', null);
    }
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/settings" exact component={Settings} />
                <Route
                  path="/settings/account-info"
                  exact
                  component={AccountInfo}
                />
                <Route
                  path="/settings/accepted-tokens"
                  exact
                  component={AcceptedTokens}
                />
                <Route
                  path="/settings/base-currency"
                  exact
                  component={BaseCurrency}
                />
                <Route
                  path="/settings/required-confirmations"
                  exact
                  component={RequiredConfirmations}
                />
                <Route
                  path="/settings/wallet-address"
                  exact
                  component={WalletAddress}
                />
                <Route path="/test" exact component={Test} />
                <Route component={Error404} />
              </Switch>
            </BrowserRouter>
            <GlobalStyle />
          </React.Fragment>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
