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

import HDKEY from 'ethereumjs-wallet/hdkey';
import bip39 from 'bip39';
import CONF from './utils/config';

export default class HDWallet {
  /**
  * Accepts Valid bip32 passphrase
  * @param  {} secret=''
  */
  constructor(secret = null) {
    this.type = 'GenericHDWallet';
    this.defaultHDpath = CONF.defaultHDpathEthereum;
    this.secret = secret;

    /**
     * Should we have a pending array?
     */
    if (secret) {
      this.import();
    }
  }

  import() {
    // TODO
    /**
     * we need to indenty if's a mnemonic or private key
     * if( this.secret.length === 12 )
     */
    this.importFromMasterSeed();
  }

  importFromMasterSeed() {
    const seed = bip39.mnemonicToSeed(this.secret);
    this._hd = HDKEY.fromMasterSeed(seed);
    this.instanceWallet = this._hd.derivePath(this.defaultHDpath).getWallet();
  }

  // TODO tests
  importFromExtendedKey(seed) {
    this._hd = HDKEY.fromExtendedKey(seed);
    this.instanceWallet = this._hd.derivePath(this.defaultHDpath).getWallet();
  }

  static validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }

  /**
   * BIP32 Extended private key
   * Info: m
   * https://bip32jp.github.io/english/
   */
  getPrivateExtendedKey() {
    return this._hd.privateExtendedKey();
  }

  /**
   * BIP32 Extended public key
   * Info: m
   * https://bip32jp.github.io/english/
   */
  getPublicExtendedKey() {
    return this._hd.publicExtendedKey();
  }

  /**
   * BIP32 Derived Extended private key from this.defaultHDpath
   */
  getDerivedPrivateExtendedKey() {
    return this._hd.derivePath(this.defaultHDpath).privateExtendedKey();
  }

  /**
   * BIP32 Derived Extended public key from this.defaultHDpath
   */
  getDerivedPublicExtendedKey() {
    return this._hd.derivePath(this.defaultHDpath).publicExtendedKey();
  }

  /**
   * Private Key of the instance wallet
   */
  getPrivateKey() {
    return this.instanceWallet.getPrivateKey().toString('hex');
  }

  /**
   * return ethUtil.bufferToHex(this.getPrivateKey())
   */
  getPrivateKeyString() {
    return this.instanceWallet.getPrivateKeyString();
  }

  /**
   * return ethUtil.bufferToHex(this.getPrivateKey())
   */
  getPublicKeyString() {
    if (this.watchOnly) return this.address;
    return this.instanceWallet.getPublicKeyString();
  }

  getAddress() {
    return this.instanceWallet.getAddressString();
  }
}
