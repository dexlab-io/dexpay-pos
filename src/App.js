import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('token');
    this.state = {
      loaded: false,
      isLoggedIn: !!token
    };
  }

  async componentDidMount() {
    await persistor.restore();
    this.client = client;
    await this.client.mutate({
      mutation: initAppMutation
    });
    this.setState({ loaded: true });
  }

  render() {
    const { loaded, isLoggedIn } = this.state;
    if (!loaded) {
      return <div>loading</div>;
    }

    return (
      <ApolloProvider client={this.client}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props =>
                    isLoggedIn ? (
                      <Redirect to="/dashboard" />
                    ) : (
                      <Register {...props} />
                    )
                  }
                />
                <Route
                  exact
                  path="/login"
                  render={props =>
                    isLoggedIn ? (
                      <Redirect to="/dashboard" />
                    ) : (
                      <Login {...props} />
                    )
                  }
                />
                <Route
                  exact
                  path="/forgot-password"
                  render={props =>
                    isLoggedIn ? (
                      <Redirect to="/dashboard" />
                    ) : (
                      <ForgotPassword {...props} />
                    )
                  }
                />
                <Route path="/set-password/:token" component={SetPassword} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/invoice/:id" component={Invoice} />
                <Route
                  exact
                  path="/create-invoice"
                  render={props =>
                    !isLoggedIn ? (
                      <Redirect to="/login" />
                    ) : (
                      <CreateInvoice {...props} />
                    )
                  }
                />
                <Route path="/settings" exact component={Settings} />
                <Route
                  exact
                  path="/settings/account-info"
                  render={props =>
                    !isLoggedIn ? (
                      <Redirect to="/login" />
                    ) : (
                      <AccountInfo {...props} />
                    )
                  }
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
                <Route path="/address/:id" component={Dashboard} />
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
