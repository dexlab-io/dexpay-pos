import EthereumJsWallet from 'ethereumjs-wallet';

export default class LegacyWallet {

    constructor( privateKey ){
        
        this.type = 'EthereumLegacyWallet';
        this.secret = privateKey;
        
        const wallet = EthereumJsWallet.fromPrivateKey( Buffer.from(privateKey, 'hex') );

        this.instanceWallet = wallet;
    }
}