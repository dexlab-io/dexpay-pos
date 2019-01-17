import EthereumHDWallet from './EthereumHDWallet';
import {
    ETHEREUM_TESTNET_KOVAN,
} from '../../utils/constants';

export default class EthereumHDWalletKovan extends EthereumHDWallet{
    /**
     * Accepts Valid bip32 passphrase
     * @param  {} secret=''
     */
    constructor(secret = null, address=null) {
        super(secret, address);
        this.type = 'EthereumHDWalletKovan';
        this.name = 'DexWallet Kovan';
        this.networkName = ETHEREUM_TESTNET_KOVAN;
        this.networkUrl = 'https://kovan.infura.io/Q1GYXZMXNXfKuURbwBWB';
        this.API_URL = 'https://api-kovan.etherscan.io/';
        if( secret ) {
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