import React, { Component } from 'react';

import './App.css';
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
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
    
    this.wallet = new EthereumHDWallet(false, posAddress);
    await this.wallet.setWeb3();
    await this.wallet.fetchBalance();
    await this.wallet.getNetworkID()
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={POS} />
          <Route path="/payment" component={Payment} />
          <Route path="/pos" exact component={POS} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
