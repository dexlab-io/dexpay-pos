import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import gql from 'graphql-tag';

import './theme/bulma.css'; // load bulma
import './localization'; // load i18n
import client, { persistor } from './utils/apolloClient';
import theme, { GlobalStyle } from './theme'; // load custom theme
import {
  Error404,
  Login,
  Register,
  ForgotPassword,
  SetPassword,
  Dashboard,
  Invoice,
  CreateInvoice,
  Settings,
  AccountInfo,
  AcceptedTokens,
  BaseCurrency,
  RequiredConfirmations,
  WalletAddress,
  Test
} from './pages';

const initAppMutation = gql`
  mutation initApp {
    initApp @client
  }
`;

class App extends Component {
  state = { loaded: false };

  async componentDidMount() {
    await persistor.restore();
    this.client = client;
    await this.client.mutate({
      mutation: initAppMutation
    });
    this.setState({ loaded: true });
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
                <Route path="/" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/forgot-password"
                  exact
                  component={ForgotPassword}
                />
                <Route path="/set-password/:token" component={SetPassword} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/invoice/:id" component={Invoice} />
                <Route path="/create-invoice" component={CreateInvoice} />
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
