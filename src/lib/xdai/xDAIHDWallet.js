/**
 * This file is part of eth-core-js.
 * Copyright (C) [2017-2019] by [Alessio Delmonti]
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * @author Alessio Delmonti <alessio@dexlab.io>
 * @date 2017
 */

import fetch from 'isomorphic-fetch';

import EthereumHDWallet from '../ethereum/EthereumHDWallet';

export default class xDAIHDWallet extends EthereumHDWallet {
  /**
   * Accepts Valid bip32 passphrase
   * @param  {} secret=''
   */
  constructor(secret = null, address = null) {
    super(secret, address);
    this.type = 'xDAIHDWallet';
    this.name = 'xDAI Wallet';
    this.symbol = 'xDAI';
    this.networkUrl = 'https://dai.poa.network/';
    // this.CHAIN_ID = 64;
    this.API_URL = 'https://blockscout.com/poa/dai/';

    if (secret) {
      this.setWeb3();
    }
  }

  async getGasPrice() {
    return new Promise((resolve, reject) => {
      this.gasPrice = this.web3.utils.fromWei(1, 'gwei');
      resolve(this.gasPrice);
    });
  }

  async sendCoinTransaction(toAddress, amount) {
    return new Promise((resolve, reject) => {
      this.web3.eth.sendTransaction(
        {
          to: toAddress,
          value: this.web3.toWei(amount),
          gasPrice: 1000000000,
        },
        (error, transaction) => {
          if (error) {
            reject(error);
          }

          // console.log('transaction', transaction);

          resolve(transaction);
        },
      );
    });
  }

  async fetchEthTransactions() {
    const networkUrl = `${
      this.API_URL
    }api?module=account&action=txlist&address=${this.getAddress()}&sort=desc`;
    return fetch(networkUrl)
      .then(response => response.json())
      .then(res => res.result)
      .then((transactions) => {
        this.transactions = transactions.map(t => ({
          from: t.from,
          timestamp: t.timeStamp,
          transactionHash: t.hash,
          type: t.contractAddress !== '' ? 'transfer' : 'contract',
          value: this.web3.utils.fromWei(t.value, 'ether'),
          currency: 'xDAI',
        }));
        return this.transactions;
      });
  }

  async fetchERC20Transactions(contractAddress) {
    return null;
  }

  // TODO tests
  /**
   * Load the tokens based on network
   */
  async loadTokensList() {
    return null;
  }
}
