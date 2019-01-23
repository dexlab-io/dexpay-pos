import React, { Component } from 'react';

import './App.css';
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
import xDAIHDWallet from './class/xdai/xDAIHDWallet';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Error404, Payment , POS} from './pages';
const posAddress = '0xd18a54f89603Fe4301b29EF6a8ab11b9Ba24f139';

const Dummy = () => {
  return (<div>Dexpay: POS</div>)
}
class App extends Component {

  componentDidMount() {
    this.init();
  }

  async init() {
    
    this.wallets = {
      eth: new EthereumHDWallet(false, posAddress),
      xdai: new xDAIHDWallet(false, posAddress),
    };

    await this.wallets.xdai.setWeb3();
    const txs = await this.wallets.xdai.fetchEthTransactions();
    console.log('txs', txs);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={POS} />
          <Route path="/payment/:id?" component={Payment} />
          <Route path="/pos" exact component={POS} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
