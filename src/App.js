import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './bulma/styles.css';
import theme, { GlobalStyle } from './config/theme';
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
import { Error404, Dashboard, Payment } from './pages';

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
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/payment/:id?" component={Payment} />
              <Route path="/pos" exact component={Dashboard} />
              <Route component={Error404} />
            </Switch>
          </BrowserRouter>
          <GlobalStyle />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;