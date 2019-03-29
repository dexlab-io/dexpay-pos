import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import EthereumHDWallet from '../../class/ethereum/EthereumHDWallet';
import { Loading } from '../../components/elements';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CryptoAmount from '../../components/CryptoAmount';
import FiatAmount from '../../components/FiatAmount';
import AddressClipboard from '../../components/AddressClipboard';
import NetworkStatus from './components/NetworkStatus';
import Breadcrumb from './components/Breadcrumb';
import dexLogo from '../../assets/images/dex-logo.png';
import metaMaskLogo from '../../assets/images/metamask-logo.png';
import privateKeyLogo from '../../assets/images/private-key-logo.png';
import starbuckLogo from '../../assets/dummy/starbuck-logo.png';

const Container = styled.div`
  width: 445px;
`;
const Footer = styled.div`
  text-align: center;
  margin-top: 30px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Logo = styled.img`
  width: auto;
  height: 21px;
  margin-left: 10px;
`;

const InnerBox = styled(Container)`
  height: 450px;
  box-shadow: 0px 0px 9px 2px rgba(82, 82, 82, 0.22);
  border-radius: 12px;
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 20% 60% 20%;
  grid-template-columns: 100%;
`;
const InnerBoxShared = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 90px;
`;
const InnerBoxHeader = styled(InnerBoxShared)`
  grid-area: header;
  background-color: #f0f0f0;
  align-items: center;
`;
const InnerBoxContent = styled(InnerBoxShared)`
  grid-area: content;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
`;
const InnerBoxFooter = styled(InnerBoxShared)`
  grid-area: footer;
  background-color: #f0f0f0;
`;

const BrandLogo = styled.img`
  max-height: 50px;
  width: auto;
  height: auto;
`;
const Tag = styled.p`
  font-size: 14px;
`;
const FiatAmountWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  > div {
    width: 100%;
  }
`;
const Info = styled.p`
  font-size: 12px;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px 0px;
  padding-left: 2em;
  padding-right: 2em;
`;
const ButtonLogo = styled.img`
  width: 23px;
  height: auto;
  margin-right: 12px;
`;

const query = gql`
  query Invoice($id: String) {
    invoice(invoiceNumber: $id) {
      id
      invoiceNumber
      fiatAmount
      fiatCurrency
      store {
        id
        name
        walletAddress
      }
    }
  }
`;

class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      walletConnected: false,
      isApproved: false,
      isSuccessful: false,
      walletAddress: null
    };
  }

  goToStepTwo = () => {
    this.setState({ step: 2 });
  };

  handleUseMetamask = async () => {
    const wallet = new EthereumHDWallet();
    await wallet.setWeb3();
    const metaMaskAddress = wallet.getAddress();
    // update cache
    if (metaMaskAddress) {
      this.setState({ walletAddress: metaMaskAddress, walletConnected: true });
    }
  };

  handleUsePrivateKey = () => {
    // TODO: import via private key
    this.setState({
      walletAddress: 'some-wallet-address',
      walletConnected: true
    });
  };

  handleApprove = () => {
    this.setState({ isApproved: true, step: 3 });
  };

  handlePay = () => {
    this.setState({ isSuccessful: true });
  };

  render() {
    const { step, walletConnected, isApproved, isSuccessful } = this.state;
    const { match } = this.props;

    let stepText = 'Payment Method';
    if (step === 2) {
      stepText = 'Connect Wallet';
    } else if (step === 3) {
      stepText = 'Recap & Pay';
    }

    const fiatAmount = invoice => (
      <FiatAmountWrapper>
        <FiatAmount
          fiatCurrency={invoice.fiatCurrency}
          fiatAmount={parseFloat(invoice.fiatAmount)}
        />
      </FiatAmountWrapper>
    );

    const cryptoAmount = (
      <CryptoAmount
        cryptoCurrency="dai"
        cryptoValue={{ dai: 12 }}
        fiatAmount={parseFloat('14.50')}
        hasSelection
        handleChange={option => {
          console.log({ selectedCurrency: option.value });
        }}
        style={{ borderBottom: 'none' }}
      />
    );

    return (
      <Layout isSlim>
        <Seo title="Invoice" />
        <div className="section">
          <Container className="container">
            <Breadcrumb
              step={step}
              text={stepText}
              goToStep={stepNumber => this.setState({ step: stepNumber })}
            />
            <Query query={query} variables={{ id: match.params.id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return `Error!: ${error}`;
                const { invoice } = data;
                // console.log('data', data);

                return (
                  <InnerBox>
                    <InnerBoxHeader>
                      <BrandLogo src={starbuckLogo} />
                    </InnerBoxHeader>
                    <InnerBoxContent>
                      {step === 1 && (
                        <React.Fragment>
                          <Tag>Total you pay</Tag>
                          {fiatAmount(invoice)}
                          {cryptoAmount}
                          <button
                            type="submit"
                            className="button is-black is-large is-fullwidth"
                            onClick={this.goToStepTwo}
                          >
                            CONTINUE
                          </button>
                        </React.Fragment>
                      )}
                      {step === 2 && !walletConnected && (
                        <React.Fragment>
                          <Tag>Unlock your wallet</Tag>
                          <Button
                            type="button"
                            onClick={this.handleUseMetamask}
                            className="button is-medium is-fullwidth"
                          >
                            <ButtonLogo
                              src={metaMaskLogo}
                              alt="Metamask Logo"
                            />
                            METAMASK
                          </Button>
                          {/* <Button
                            type="button"
                            onClick={this.handleUsePrivateKey}
                            className="button is-medium is-fullwidth"
                          >
                            <ButtonLogo
                              src={privateKeyLogo}
                              alt="Private Key Logo"
                            />
                            PRIVATE KEY
                          </Button> */}
                        </React.Fragment>
                      )}
                      {step === 2 && walletConnected && (
                        <React.Fragment>
                          <Tag>Total you pay</Tag>
                          {fiatAmount(invoice)}
                          {cryptoAmount}
                          <Info>
                            You need to give permission for Dexpay to interact
                            with DAI
                          </Info>
                          <button
                            type="submit"
                            className="button is-black is-large is-fullwidth"
                            onClick={this.handleApprove}
                          >
                            APPROVE
                          </button>
                        </React.Fragment>
                      )}
                      {step === 3 && isApproved && !isSuccessful && (
                        <React.Fragment>
                          <Tag>Total you pay</Tag>
                          {fiatAmount(invoice)}
                          {cryptoAmount}
                          <Info>
                            You need to give permission for Dexpay to interact
                            with DAI
                          </Info>
                          <button
                            type="submit"
                            className="button is-black is-large is-fullwidth"
                            onClick={this.handlePay}
                          >
                            PAY NOW
                          </button>
                        </React.Fragment>
                      )}
                      {step === 3 && isApproved && isSuccessful && (
                        <React.Fragment>
                          <Tag>You paid!</Tag>
                          {fiatAmount(invoice)}
                          {cryptoAmount}
                          <button
                            type="submit"
                            className="button is-large is-fullwidth"
                          >
                            See it on Etherscan
                          </button>
                        </React.Fragment>
                      )}
                    </InnerBoxContent>
                    <InnerBoxFooter>
                      <AddressClipboard address={invoice.store.walletAddress} />
                      <NetworkStatus
                        label="Ethereum Main Network"
                        status={walletConnected ? 'connected' : 'not connected'}
                      />
                    </InnerBoxFooter>
                  </InnerBox>
                );
              }}
            </Query>
            <Footer>
              <p>
                Powered by <Logo src={dexLogo} alt="Dexpay logo" />
              </p>
            </Footer>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Invoice;
