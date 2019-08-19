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

import BigNumber from 'bignumber.js';
import fetch from 'isomorphic-fetch';

import EthereumHDWallet from './EthereumHDWallet';
import Token from '../Token';
import { defaultTokens } from '../utils/constants';

export default class EthereumHDWalletRopsten extends EthereumHDWallet {
  /**
     * Accepts Valid bip32 passphrase
     * @param  {} secret=''
     */
  constructor(secret = null, address = null) {
    super(secret, address);
    this.type = 'EthereumHDWalletRopsten';
    this.name = 'Ropsten wallet';
    this.networkUrl = 'https://ropsten.infura.io/Q1GYXZMXNXfKuURbwBWB';
    this.API_URL = 'https://api-ropsten.etherscan.io/';
    this.CHAIN_ID = 3;
    if (secret) {
      this.setWeb3();
    }
  }

  async fetchERC20Transactions(contractAddress) {
    return null;
  }
  // TODO tests
  /**
     * Load the tokens based on network
     */
  async loadTokensList() {
    if (this.tokens.length > 0) return this.tokens;

    const url = `https://blockscout.com/eth/ropsten/api?module=account&action=tokenlist&address=${this.getAddress()}`;
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        if (!data.result) {
          return;
        }

        const tokens = data.result.map((token) => {
          const tokenDecimal = parseInt(token.decimals, 10);
          const balance = parseFloat(new BigNumber(token.balance).div(new BigNumber(10).pow(tokenDecimal)).toString());
          return new Token(
            token.contractAddress,
            tokenDecimal,
            token.name,
            token.symbol,
            `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${token.contractAddress}.png`,
            {},
            balance,
            new BigNumber(token.balance),
          );
        });

        const coin = defaultTokens[0];
        coin.balance = this.balance;
        this.tokens = tokens;

        // console.log('tokens', tokens);
        return this.tokens;
      });
  }
}
