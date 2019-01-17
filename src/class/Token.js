export default class Token {
    constructor(contractAddress = '', decimals = 18, name = '', symbol = '', image = '', price = {}, balance = 0, balanceDecimals = 0) {
        this.balanceHex = "0x70a08231";
        this.transferHex = "0xa9059cbb";
        this.contractAddress = contractAddress;
        this.isSendAllow = true;
        this.decimals = decimals;
        this.name = name;
        this.symbol = symbol;
        this.image = image;
        this.balance = balance;
        this.balanceDecimals = balanceDecimals;
        this.transactions = [];
        this.price = price;
    }
}