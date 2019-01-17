import React, { Component } from 'react';

import './App.css';
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
//import WatcherTx from './class/WatcherTx';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Error404, Payment } from './pages';
const posAddress = '0xd18a54f89603Fe4301b29EF6a8ab11b9Ba24f139';

const Dummy = () => {
  return (<div>Dexpay: POS</div>)
}
class App extends Component {

  componentDidMount() {
    this.init();
  }

  async init() {
    
    this.wallet = new EthereumHDWallet(false, posAddress);
    await this.wallet.setWeb3();
    await this.wallet.fetchBalance();
    await this.wallet.getNetworkID()
    console.log(this.wallet.balance);
    console.log( this.wallet.networkID )

    // const watcher = new WatcherTx();
    // watcher.etherTransfers(posAddress)

  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dummy} />
          <Route path="/payment" exact component={Payment} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
