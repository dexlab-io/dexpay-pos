import EthereumJsWallet from 'ethereumjs-wallet';
import HDKEY from 'ethereumjs-wallet/hdkey';
import bip39 from 'bip39';
import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet';
import Web3Subprovider from 'web3-provider-engine/subproviders/web3';
import EthereumTx from 'ethereumjs-tx';
import { store } from '../../stateManagement/store';
import {
  SET_WALLET_ADDRESS,
  SET_CALL_TO_ACTION_DISMISSED,
  SET_PRIVATE_KEY,
  SET_PASSPHRASE,
  CLEAR_TOKENS,
  ADD_TOKEN,
} from '../../stateManagement/actionTypes';
import AnalyticsUtils from '../../utils/analytics';
import { erc20Abi } from '../../utils/constants';
import UbiqCustomNode from '../../utils/ubiqUtils';
import EthFuncs from './ethFunc';
import { AbstractWallet } from '../bitcoin/';
import CONF from '../../config';

const ENS = require('ethjs-ens');

export default class EthereumWallet extends AbstractWallet {
  /**
   * Given an EthereumJSWallet instance, store both address and private key
   * in Redux store
   *
   * @param {Object} wallet
   */

  SELECTED_NETWORK = 'MAIN';
  INSTANCE = null;
  ENS = null;
  CHAIN_ID = 1;

  static storeWallet(wallet) {
    store.dispatch({
      type: SET_WALLET_ADDRESS,
      walletAddress: wallet.getAddressString(),
    });

    store.dispatch({
      type: SET_CALL_TO_ACTION_DISMISSED,
    });

    store.dispatch({
      type: SET_PRIVATE_KEY,
      privateKey: wallet.getPrivateKey().toString('hex'),
    });
  }

  static fromMasterSeed(seed) {
    return HDKEY.fromMasterSeed(seed);
  }

  /**
   * Generate an Ethereum wallet
   */
  static generateWallet(mnemonic) {
    const seed = bip39.mnemonicToSeed(mnemonic.join(' '));
    const wallet = HDKEY.fromMasterSeed(seed).derivePath(CONF.defaultHDpathEthereum).getWallet();

    store.dispatch({
      type: SET_PASSPHRASE,
      passphrase: mnemonic,
    });

    AnalyticsUtils.trackEvent('Generate wallet', {
      walletAddress: wallet.getAddressString(),
    });

    this.storeWallet(wallet, false);
  }

  /**
   * Store a wallet in Redux store given a private key
   *
   * @param {String} privateKey
   */
  static restoreWallet(privateKey) {
    const wallet = EthereumJsWallet.fromPrivateKey(
      Buffer.from(privateKey, 'hex'),
    );

    AnalyticsUtils.trackEvent('Import wallet', {
      walletAddress: wallet.getAddressString(),
    });

    this.storeWallet(wallet, true);
  }

  /**
   * Reads an EthereumJSWallet instance from Redux store
   */
  static getPrivateKey() {
    const { privateKey } = store.getState().appReducer;
    return privateKey;
  }

  static getWallet() {
    const { privateKey } = store.getState().appReducer;
    return EthereumJsWallet.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  }

  static getWeb3HTTPProvider() {
    const NETWORK = store.getState().appReducer.selectedNetwork;
    let networkUrl;
    switch (NETWORK) {
      case 'MAIN':
        networkUrl = 'https://mainnet.infura.io/Q1GYXZMXNXfKuURbwBWB';
        this.CHAIN_ID = 1;
        break;
      case 'KOVAN':
        networkUrl = 'https://kovan.infura.io/Q1GYXZMXNXfKuURbwBWB';

        break;
      case 'UBIQ':
        this.CHAIN_ID = 1;
        networkUrl = 'https://pyrus2.ubiqscan.io';
        break;
      case 'CLASSIC':
        networkUrl = 'https://web3.gastracker.io"';
        break;
      case 'SOKOL':
        networkUrl = 'https://sokol.poa.network';
        break;
      case 'ROPSTEN':
        networkUrl = 'https://ropsten.infura.io/Q1GYXZMXNXfKuURbwBWB';
        this.CHAIN_ID = 3;
        break;
      case 'POA':
        networkUrl = 'https://core.poa.network';
        break;
      default:
        networkUrl = 'https://api.myetherapi.com/eth';
    }
    return networkUrl;
  }

  static web3AsynWrapper(web3Fun) {
    return function(arg) {
      return new Promise((resolve, reject) => {
        web3Fun(arg, (e, data) => (e ? reject(e) : resolve(data)));
      });
    };
  }

  /**
   * Returns a web3 instance with the user's wallet
   */
  static getENSInstance() {
    const provider = new Web3.providers.HttpProvider(
      this.getWeb3HTTPProvider(),
    );
    this.ENS = new ENS({ provider, network: this.CHAIN_ID.toString() });
    return this.ENS;
  }

  /**
   * Returns a web3 instance with the user's wallet
   */
  static getWeb3Instance() {
    // if(this.INSTANCE) return this.INSTANCE;
    // Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    const wallet = this.getWallet();

    const engine = new ProviderEngine();

    engine.addProvider(new WalletSubprovider(wallet, {}));
    engine.addProvider(
      new Web3Subprovider(
        new Web3.providers.HttpProvider(this.getWeb3HTTPProvider()),
      ),
    );

    engine.start();

    this.INSTANCE = new Web3(engine);
    this.INSTANCE.eth.defaultAccount = wallet.getAddressString();
    return this.INSTANCE;
  }

  /**
   * Load the tokens based on network
   */
  static loadTokensList() {
    const NETWORK = store.getState().appReducer.selectedNetwork;
    const { availableTokens, walletAddress } = store.getState().appReducer;

    switch (NETWORK) {
      case 'MAIN':
        const availableTokensAddresses = [];

        const deletedTokens = [];
        // remove deleted tokens
        availableTokens.forEach((o) => {
          if (o.isDeleted) {
            deletedTokens.push(o.contractAddress);
          }
       });

        fetch(
          `https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=freekey`,
        )
          .then(response => response.json())
          .then(data => {
            if (!data.tokens) {
              return;
            }

            data.tokens
              .filter(
                token =>
                  !availableTokensAddresses.includes(token.tokenInfo.address),
              )
              .filter(
                token =>
                  !deletedTokens.includes(token.tokenInfo.address),
              )
              .forEach(token => {

                store.dispatch({
                  type: ADD_TOKEN,
                  token: {
                    contractAddress: token.tokenInfo.address,
                    isSendAllow: true,
                    decimals: parseInt(token.tokenInfo.decimals, 10),
                    name: token.tokenInfo.name,
                    symbol: token.tokenInfo.symbol,
                    isDeleted: false,
                  },
                });
              });
          });
        break;
      case 'UBIQ':
        // fetch(`https://api1.ubiqscan.io/v2/getbalance/${walletAddress}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('defaultTokensUbiq', defaultTokensUbiq);

        //     defaultTokensUbiq.forEach(token => {
        //       store.dispatch({
        //         type: ADD_TOKEN,
        //         token,
        //       });
        //     });
        //   });
        break;
      case 'CLASSIC':
      case 'SOKOL':
      case 'POA':
        store.dispatch({ type: CLEAR_TOKENS });
        break;
      default:
        break;
    }
  }

  /**
   * Fetch a list of transactions for the user's wallet concerning the given token
   *
   * @param {Object} token
   */
  static fetchTransactions({ contractAddress, symbol }) {
    if (symbol === 'ETH' || symbol === 'UBQ') {
      return this.getEthTransactions();
    }

    return this.getERC20Transactions(contractAddress);
  }

  /**
   * Fetch a list of ETH transactions for the user's wallet
   */
  static getEthTransactions() {
    const { walletAddress } = store.getState().appReducer;

    const web3 = new Web3(
      new Web3.providers.HttpProvider(this.getWeb3HTTPProvider()),
    );
    const NETWORK = store.getState().appReducer.selectedNetwork;
    console.log('NETWORK', NETWORK);

    let networkUrl;
    switch (NETWORK) {
      case 'MAIN':
        networkUrl = `https://api.ethplorer.io/getAddressTransactions/${walletAddress}?apiKey=freekey`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));

            return this.transactions;
          });
        break;
      case 'UBIQ':
        networkUrl = `https://api1.ubiqscan.io/v2/getaccounttransactions/${walletAddress}`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(transactions => {
            this.transactions = transactions.result.map(t => ({
              from: t.from,
              timestamp: null,
              blockNumber: t.blockNumber,
              transactionHash: t.hash,
              value: web3.utils.fromWei(t.value, 'ether'),
            }));
            return this.transactions;
          })
          .catch(err => {
            console.log('err', err);
          });
      case 'SOKOL':
        networkUrl = `https://sokol.trustwalletapp.com/transactions?address=${walletAddress}`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(res => res.docs)
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));
            return this.transactions;
          });
      case 'CLASSIC':
        networkUrl = `https://classic.trustwalletapp.com/transactions?address=${walletAddress}`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(res => res.docs)
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));
            return this.transactions;
          });
      case 'KOVAN':
        networkUrl = `https://kovan.trustwalletapp.com/transactions?address=${walletAddress}`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(res => res.docs)
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));
            return this.transactions;
          });
      case 'ROPSTEN':
        networkUrl = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(res => res.result)
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));
            return this.transactions;
          });
      case 'POA':
        networkUrl = `https://poa.trustwalletapp.com/transactions?address=${walletAddress}`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(res => res.docs)
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));
            return this.transactions;
          });
      default:
        networkUrl = `https://api.ethplorer.io/getAddressTransactions/${walletAddress}?apiKey=freekey`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.type,
              value: t.value.toFixed(5),
            }));
            return this.transactions;
          });
    }
  }

  /**
   * Fetch a list of a given token transactions for the user's wallet
   *
   * @param {String} contractAddress
   */
  static getERC20Transactions(contractAddress) {
    const { walletAddress } = store.getState().appReducer;

    return fetch(
      `https://api.ethplorer.io/getAddressHistory/${walletAddress}?token=${contractAddress}&apiKey=freekey`,
    )
      .then(response => response.json())
      .then(data =>
        (data.operations || []).map(t => ({
            from: t.from,
            timestamp: t.timestamp,
            transactionHash: t.transactionHash,
            type: t.type,
            // to: t.to,
            value: (
              parseInt(t.value, 10) / Math.pow(10, t.tokenInfo.decimals)
            ).toFixed(2),
          })),
      );
  }

  /**
   * Fetch GAS recomendations from eth gas station
   *
   * @param {String} contractAddress
   */
  static getGASRecommendation() {
    return fetch(`https://ethgasstation.info/json/ethgasAPI.json`)
      .then(response => response.json())
      .then(data => ({
          ...data,
          fast: data.fast / 10,
          fastest: data.fastest / 10,
          safeLow: data.safeLow / 10,
          average: data.average / 10,
        }));
  }

  /**
   * Get the user's wallet balance of a given token
   *
   * @param {Object} token
   */
  static fetchBalance({ isNative, contractAddress, symbol, decimals }) {
    if (isNative && isNative === true) {
      if (symbol === 'UBQ') {
        return this.getUbqBalance();
      }
      return this.getEthBalance();
    }

    return this.getERC20Balance(contractAddress, decimals);
  }

  /**
   * Get the user's wallet ETH balance
   */
  static getUbqBalance() {
    const { walletAddress } = store.getState().appReducer;
    const Ubq = new UbiqCustomNode();

    return new Promise(resolve => {
      Ubq.getBalance(walletAddress).then(weiBalance => {
        const balance = weiBalance / Math.pow(10, 18);
        AnalyticsUtils.trackEvent('Get UBQ balance', {
          balance,
        });
        this.balance = balance;
        resolve(balance);
      });
    });
  }

  /**
   * Get the user's wallet ETH balance
   */
  static getEthBalance() {
    const { walletAddress } = store.getState().appReducer;

    console.log('S1 - Fetching balance for:', walletAddress);

    const web3 = this.getWeb3Instance();

    return new Promise((resolve, reject) => {
      web3.eth.getBalance(walletAddress, (error, weiBalance) => {
        if (error) {
          reject(error);
        }

        const balance = weiBalance / Math.pow(10, 18);
        // const balance = web3.utils.fromWei(weiBalance, 'ether');

        AnalyticsUtils.trackEvent('Get ETH balance', {
          balance,
        });

        this.balance = balance;
        resolve(balance);
      });
    });
  }

  /**
   * Get the user's wallet balance of a specific ERC20 token
   *
   * @param {String} contractAddress
   * @param {Number} decimals
   */
  static getERC20Balance(contractAddress, decimals) {
    const { walletAddress } = store.getState().appReducer;

    const web3 = new Web3(
      new Web3.providers.HttpProvider(this.getWeb3HTTPProvider()),
    );

    return new Promise((resolve, reject) => {
      web3.eth
        .contract(erc20Abi)
        .at(contractAddress)
        .balanceOf(walletAddress, (error, decimalsBalance) => {
          if (error) {
            reject(error);
          }

          const balance = decimalsBalance / Math.pow(10, decimals);

          AnalyticsUtils.trackEvent('Get ERC20 balance', {
            balance,
            contractAddress,
          });

          this.balance = balance;

          resolve(balance);
        });
    });
  }

  static toEth(val) {
    const web3 = this.getWeb3Instance();
    return web3.utils.fromWei(val, 'ether');
  }

  static getAddress() {
    const { walletAddress } = store.getState().appReducer;
    return walletAddress;
  }

  /**
   * Calculate the amout of GAS added or substracted
   * From the GAS estimation
   *
   * @param {Object} token
   * @param {String} toAddress
   * @param {String} amount
   */
  static calculateGasMultiplier(multiplier = 0, gas) {
    if (multiplier < 0) {
      return gas - parseInt(gas / 100 * Math.abs(multiplier), 10);
    }
    return gas + parseInt(gas / 100 * multiplier, 10);
  }

  static gasPrice() {
    const web3 = this.getWeb3Instance();
    return new Promise((resolve, reject) => {
      try {
        web3.eth.getGasPrice((error, price) => {
          if (error) {
            reject(error);
          }
          resolve(web3.utils.fromWei(price.toString(), 'ether'));
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Send a transaction from the user's wallet
   *
   * @param {Object} token
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendTransaction(
    { contractAddress, symbol, decimals },
    toAddress,
    amount,
  ) {
    const { selectedNetwork } = store.getState().appReducer;
    if (symbol === 'ETH' || symbol === 'POA') {
      return this.sendETHTransaction(toAddress, amount);
    }

    if (symbol === 'UBQ') {
      return this.sendUBQTransaction(toAddress, amount);
    }

    if (selectedNetwork === 'UBIQ') {
      return this.sendERC20UbiqTransaction(toAddress, amount);
    }

    return this.sendERC20Transaction(
      contractAddress,
      decimals,
      toAddress,
      amount,
    );
  }

  /**
   * Send an UBQ transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendUBQTransaction(toAddress, amount) {
    const { walletAddress } = store.getState().appReducer;
    const Ubq = new UbiqCustomNode();

    AnalyticsUtils.trackEvent('Send UBQ transaction', {
      value: amount,
    });

    return new Promise((resolve, reject) => {
      const web3 = this.getWeb3Instance();

      Ubq.getTransactionCount(walletAddress).then(nonce => {
        const txData = {
          to: toAddress,
          nonce: web3.toHex(nonce),
          value: web3.toHex(web3.toWei(amount, 'ether')),
          gasLimit: web3.toHex(21000),
          gasPrice: web3.toHex(web3.toWei(21, 'gwei')),
        };

        const serializedTx = WalletUtils.getSignedRawTx(txData);

        Ubq.sendRawTx(`0x${serializedTx.toString('hex')}`)
          .then(res => {
            console.log('RES', res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  /**
   * Get Serialised Signed Transaction
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static getSignedRawTx(txData) {
    const tx = new EthereumTx(txData);
    const privateKeyHex = new Buffer(WalletUtils.getPrivateKey(), 'hex');
    tx.sign(privateKeyHex);
    return tx.serialize();
  }

  /**
   * Send an ETH transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendETHTransaction(toAddress, amount) {
    const web3 = this.getWeb3Instance();

    AnalyticsUtils.trackEvent('Send ETH transaction', {
      value: amount,
    });

    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(
        {
          to: toAddress,
          value: web3.toWei(amount),
        },
        (error, transaction) => {
          if (error) {
            reject(error);
          }

          resolve(transaction);
        },
      );
    });
  }

  /**
   * Resolve ENS domain into address
   *
   * @param {String} domain
   */
  static resolveENS(domain) {
    const ens = this.getENSInstance();

    AnalyticsUtils.trackEvent('Resolve ENS address', {
      domain,
    });

    return new Promise((resolve, reject) => {
      try {
        ens
          .lookup(domain)
          .then(address => {
            try {
              resolve(address);
            } catch (e) {
              reject(e);
            }
          })
          .catch(reason => {
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

  /**
   * Send an UBIQ erc20 transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendERC20UbiqTransaction(
    contractAddress,
    decimals,
    toAddress,
    amount,
  ) {
    const web3 = this.getWeb3Instance();
    const Ubq = new UbiqCustomNode();
    const { walletAddress, availableTokens } = store.getState().appReducer;

    AnalyticsUtils.trackEvent('Send sendERC20Ubiq transaction', {
      contractAddress,
      value: amount,
    });

    return new Promise((resolve, reject) => {
      Ubq.getTransactionCount(walletAddress).then(nonce => {
        console.log('nonce', nonce);

        const transferHex = '0xa9059cbb';
        const value = EthFuncs.padLeft(
          new BigNumber(value).times(
            new BigNumber(10).pow(decimals).toString(16),
            64,
          ),
        );
        const toAdd = EthFuncs.padLeft(EthFuncs.getNakedAddress(toAdd), 64);
        // const data = transferHex + toAdd + value;

        const txData = {
          to: toAddress,
          nonce: web3.toHex(nonce),
          value: web3.toHex(web3.toWei(amount, 'ether')),
          gasLimit: web3.toHex(21000),
          gasPrice: web3.toHex(web3.toWei(21, 'gwei')),
        };

        console.log('txData', txData);

        // Ubq.sendRawTx(`0x${serializedTx.toString('hex')}`)
        //   .then(res => {
        //     console.log('RES', res);
        //     resolve(res);
        //   })
        //   .catch(err => {
        //     reject(err);
        //   });
      });
    });
  }

  /**
   * Send an ETH erc20 transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendERC20Transaction(contractAddress, decimals, toAddress, amount) {
    const web3 = this.getWeb3Instance();

    AnalyticsUtils.trackEvent('Send ERC20 transaction', {
      contractAddress,
      value: amount,
    });

    return new Promise((resolve, reject) => {
      web3.eth
        .contract(erc20Abi)
        .at(contractAddress)
        .transfer(
          toAddress,
          amount * Math.pow(10, decimals),
          (error, transaction) => {
            if (error) {
              reject(error);
            }

            resolve(transaction);
          },
        );
    });
  }
}
