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

import Web3 from 'web3';
import ENS from 'ethjs-ens';

export default class ENSResolver {
  constructor() {
    this.networkUrl = 'https://mainnet.infura.io/Q1GYXZMXNXfKuURbwBWB';
    const provider = new Web3.providers.HttpProvider(this.networkUrl);
    this.CHAIN_ID = 1;
    this.instance = new ENS({ provider, network: this.CHAIN_ID.toString() });
  }

  byAddress(address) {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .reverse(address)
          .then((domain) => {
            try {
              resolve(domain);
            } catch (e) {
              reject(e);
            }
          })
          .catch((reason) => {
            try {
              reject(reason);
            } catch (e) {
              reject(reason);
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  byDomain(domain) {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .lookup(domain)
          .then((address) => {
            try {
              resolve(address);
            } catch (e) {
              reject(e);
            }
          })
          .catch((reason) => {
            try {
              reject(reason);
            } catch (e) {
              reject(reason);
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}
