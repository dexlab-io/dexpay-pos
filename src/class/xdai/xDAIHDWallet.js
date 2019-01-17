import EthereumHDWallet from '../ethereum/EthereumHDWallet';
import {
    XDAI_NETWORK,
} from '../../utils/constants';


export default class xDAIHDWallet extends EthereumHDWallet{
    /**
     * Accepts Valid bip32 passphrase
     * @param  {} secret=''
     */
    constructor(secret = null, address=null) {
        super(secret, address);
        this.type = 'xDAIHDWallet';
        this.name = 'xDAI Wallet';
        this.symbol = 'xDAI';
        this.networkUrl = 'https://dai.poa.network/';
        // this.CHAIN_ID = 64;
        this.API_URL = 'https://blockscout.com/poa/dai/';
        
        if( secret ) {
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
                    gasPrice: 1000000000
                }, 
                (error, transaction) => {
                    if (error) {
                        reject(error);
                    }

                    console.log('transaction', transaction)

                    resolve(transaction);
                },
            );
        });
    }

    async fetchEthTransactions() {
        const networkUrl = `${this.API_URL}api?module=account&action=txlist&address=${this.getAddress()}&sort=desc`;
        return fetch(networkUrl)
          .then(response => response.json())
          .then(res => res.result)
          .then(transactions => {
            this.transactions = transactions.map(t => ({
              from: t.from,
              timestamp: t.timestamp,
              transactionHash: t.hash,
              type: t.contractAddress !== '' ? 'transfer' : 'contract',
              value:  this.web3.utils.fromWei(t.value, 'ether'),
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