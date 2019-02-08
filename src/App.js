import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './theme/bulma.css'; // load bulma
import './localization'; // load i18n
import apolloClient from './utils/apolloClient';
import theme, { GlobalStyle } from './theme'; // load custom theme
import config from './config';
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
import { Error404, Dashboard, Test } from './pages';

import { store } from './store';

class App extends Component {
  componentDidMount() {
    this.init();
  }

  async init() {
    this.wallet = new EthereumHDWallet(false, config.posAddress);
    await this.wallet.setWeb3();
    await this.wallet.fetchBalance();
    await this.wallet.getNetworkID();
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact render={() => <Dashboard />} />
                <Route
                  path="/test"
                  exact
                  render={() => <Test store={store} />}
                />
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
