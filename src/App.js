import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './theme/bulma.css'; // load bulma
import './localization'; // load i18n
import apolloClient from './utils/apolloClient';
import theme, { GlobalStyle } from './theme'; // load custom theme
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
import { Error404, Dashboard, Test } from './pages';

const posAddress = '0xd18a54f89603Fe4301b29EF6a8ab11b9Ba24f139';

class App extends Component {
  componentDidMount() {
    this.init();
  }

  async init() {
    this.wallet = new EthereumHDWallet(false, posAddress);
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
                <Route path="/" exact component={Dashboard} />
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
