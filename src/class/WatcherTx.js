import Web3 from 'web3';
import CONF from '../config/';

export default class WatcherTx {

    static STATES = {
      DETECTED: 'DETECTED',
      CONFIRMED: 'CONFIRMED',
    }
    
    
    getWeb3ws (url = 'wss://ropsten.infura.io/_ws') {
        return new Web3(new Web3.providers.WebsocketProvider(url))
    }

    getWeb3Http (url = 'https://ropsten.infura.io/Q1GYXZMXNXfKuURbwBWB') {
        return new Web3(url);
    }

    validate(trx, recepient) {
        //if(CONF.ENABLE_LOGS) console.log('trx', trx);
        
        const toValid = trx.to !== null;
        if (!toValid) return false
        
        const walletToValid = trx.to.toLowerCase() === recepient.toLowerCase()
        //const amountValid = ethToWei(process.env.AMOUNT).equals(trx.value)
      
        return toValid && walletToValid;
    }

    etherTransfers(recepient, cb) {
        // Instantiate web3 with WebSocket provider
        const web3 = this.getWeb3ws();
      
        // Instantiate subscription object
        const subscription = web3.eth.subscribe('pendingTransactions')
      
        // Subscribe to pending transactions
        subscription.subscribe((error, result) => {
          if (error) console.error(error)
        }).on('data', async (txHash) => {
            try {
              // Instantiate web3 with HttpProvider
              const web3Http = this.getWeb3Http()
      
              // Get transaction details
              const trx = await web3Http.eth.getTransaction(txHash)
      
              const valid = this.validate(trx, recepient)
              // If transaction is not valid, simply return
              if (!valid) return
            
              if(CONF.ENABLE_LOGS) {
                console.log('trx', trx);
                console.log('Found incoming Ether transaction from ' + trx.from + ' to ' + trx.to);
                console.log('Transaction value is: ' + trx.value)
                console.log('Transaction hash is: ' + txHash + '\n')
              }

              // CB for detected transactions
              cb({
                state: WatcherTx.STATES.DETECTED,
                tx: trx
              });
      
              // Initiate transaction confirmation
              this.confirmEtherTransaction(txHash, CONF.confirmationNeeded, cb)
      
              // Unsubscribe from pending transactions.
              subscription.unsubscribe()
            }
            catch (error) {
              console.log(error)
            }
          })
    }

    async getConfirmations(txHash) {
        try {
          // Instantiate web3 with HttpProvider
          const web3 = this.getWeb3Http();
      
          // Get transaction details
          const trx = await web3.eth.getTransaction(txHash)
      
          // Get current block number
          const currentBlock = await web3.eth.getBlockNumber()
      
          // When transaction is unconfirmed, its block number is null.
          // In this case we return 0 as number of confirmations
          return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber
        }
        catch (error) {
          console.log(error)
        }
      }

    confirmEtherTransaction(txHash, confirmations = CONF.confirmationNeeded, cb) {
        setTimeout(async () => {
          // Get current number of confirmations and compare it with sought-for value
          const trxConfirmations = await this.getConfirmations(txHash)

          if(CONF.ENABLE_LOGS) {
            console.log('Transaction with hash ' + txHash + ' has ' + trxConfirmations + ' confirmation(s)')
          }
      
          if (trxConfirmations >= confirmations) {
            // Handle confirmation event according to your business logic
      
            if(CONF.ENABLE_LOGS) {
              console.log('Transaction with hash ' + txHash + ' has been successfully confirmed')
            }

            cb({
              state: WatcherTx.STATES.CONFIRMED,
              txHash: txHash
            });
      
            return
          }
          // Recursive call
          return this.confirmEtherTransaction(txHash, confirmations)
        }, 30 * 1000)
    }
}