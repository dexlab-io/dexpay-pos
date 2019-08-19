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

import EthereumHDWallet from './EthereumHDWallet';

export default class EthereumHDWalletKovan extends EthereumHDWallet {
  /**
     * Accepts Valid bip32 passphrase
     * @param  {} secret=''
     */
  constructor(secret = null, address = null) {
    super(secret, address);
    this.type = 'EthereumHDWalletKovan';
    this.name = 'DexWallet Kovan';
    this.networkUrl = 'https://kovan.infura.io/Q1GYXZMXNXfKuURbwBWB';
    this.API_URL = 'https://api-kovan.etherscan.io/';
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
    return null;
  }
}
