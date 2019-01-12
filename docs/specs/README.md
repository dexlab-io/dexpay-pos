# Dexpay POS specification

> This document presents `Dexpay: POS`, a modularized and extensible point of sale which enables Merchants to accept payments in cryptocurrencies without being exposed to the volatility of the specific currency used during the transaction, in a completely decentralized matter.

Authors:
- [Alessio Delmonti](https://github.com/alexintosh)

## Organization of this document

This RFC is organized by chapters described on the *Table of contents* section. Each of the chapters will be found in its own file.

## Table of contents

- [1 Introduction](1-introduction.md)
  - [1.1 Motivation](1-introduction.md#11-motivation)
  - [1.2 Goals](1-introduction.md#12-goals)

- [2 Requirements](3-requirements.md)
  - [2.1 Network agnostic: Accept DAI and xDAI](3-requirements.md#34-network-agnostic)
  - [2.2 Web3 Fallback]()
  - [2.3 Instant decentralized exchange]()
  - [2.4 ERC 1257: Proof of Payment]()
  
- [3 Architecture](3-architecture.md)
    - [3.1 Point of Sale dApp]()
    - [3.2 Backend]()
    - [3.2 Payment Gateway Smartcontract]()
    - [3.4 Meta Tx Relay]()
    
## Contribute

Please contribute! [Have a look to the issues](https://github.com/dexlab-io/dexpay-pos/issues)!

## License
[MIT](https://opensource.org/licenses/MIT) License - Copyright 2018 Dexlab.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.