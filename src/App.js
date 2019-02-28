import React, { Component } from 'react';
import qs from 'qs';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import gql from 'graphql-tag';

import './theme/bulma.css'; // load bulma
import './localization'; // load i18n
import client, { persistor } from './utils/apolloClient';
// import { store } from './store';
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

const updateAddressMutation = gql`
  mutation updateWalletAddress($address: String!) {
    updateWalletAddress(address: $address) @client
  }
`;

class App extends Component {
  state = { loaded: false };

  async componentDidMount() {
    await persistor.restore();
    this.client = client;
    this.setState({ loaded: true });
    await this.init();
  }

  async init() {
    // const t = matchPath(window.location.pathname, {
    //   path: '/address/:id'
    // });

    // if (t && t.params && t.params.id) {
    //   const address = t.params.id;
    //   store.update.pos.address(address, null, 'GET');
    //   return;
    // }

    const params = qs.parse(window.location.search.slice(1));
    this.wallet = new EthereumHDWallet();
    await this.wallet.setWeb3();

    if (this.wallet.getAddress()) {
      this.client.mutate({
        mutation: updateAddressMutation,
        variables: { address: this.wallet.getAddress() }
      });
    } else if (params.posAddress) {
      this.client.mutate({
        mutation: updateAddressMutation,
        variables: { address: params.posAddress }
      });
    }
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <div>loading</div>;
    }

    return (
      <ApolloProvider client={this.client}>
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

                <Route path="/address/:id" component={Dashboard} />

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
