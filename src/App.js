import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EthereumHDWallet from './class/ethereum/EthereumHDWallet';
import WatcherTx from './class/WatcherTx';
const posAddress = '0xd18a54f89603Fe4301b29EF6a8ab11b9Ba24f139';
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
