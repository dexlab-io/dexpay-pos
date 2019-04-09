import GatewayABI from './GatewayABI';

export default class Gateway {
  constructor(wallet) {
    this.W = wallet;
    this.G = new this.W.web3.eth.Contract(
      GatewayABI.abi,
      '0xd77281598c6F2D01c78c2Ec8235EE38D11467Da4'
    );

    this.startEventsTracking();
  }

  startEventsTracking() {
    const gatewayOptions = {
      // filter: {
      //   _payer: this.state.account
      // },
      fromBlock: 'latest'
    };

    this.G.events
      .ProofOfPayment(gatewayOptions)
      .on('data', async event => {
        console.log('ProofOfPayment', event);
      })
      .on('error', error => {
        console.log('ERROR', error);
      });
  }

  async getServiceFee() {
    const res = await this.G.methods.serviceFee().call();
    console.log('serviceFee', res);
    const ETHToken = await this.G.methods.ETHToken().call();
    console.log('ETHToken', ETHToken);
  }

  async isOrderPaid(_orderId, amount, token) {
    console.log(
      'orderPaid',
      this.W.getAddress().toLowerCase(),
      _orderId,
      this.W.web3.utils.toWei(amount.toString(), 'ether').toString(),
      token
    );
    const res = await this.G.methods
      .isOrderPaid(
        '0xb655AA2a4B7e53cCeCE4Ab3D14beCB75fbCE82B4',
        _orderId,
        this.W.web3.utils.toWei(amount.toString(), 'ether').toString(),
        token
      )
      .call();

    console.log('res', res);
    return res;
  }

  async payWithEth(order) {
    console.log('order', order);
    this.G.methods
      .payWithEth(
        '0xb655AA2a4B7e53cCeCE4Ab3D14beCB75fbCE82B4',
        order.id,
        this.W.web3.utils
          .toWei(order.tokenValue.toString(), 'ether')
          .toString(),
        false
      )
      .send({
        from: this.W.getAddress(),
        value: this.W.web3.utils.toWei(order.tokenValue.toString(), 'ether')
      })
      .on('transactionHash', hash => {
        console.log('transactionHash', hash);
      })
      .on('receipt', receipt => {
        console.log('receipt', receipt);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmationNumber', confirmationNumber, receipt);
      })
      .on('error', console.error);
  }
}
