import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CryptoAmount from '../../components/CryptoAmount';
import FiatAmount from '../../components/FiatAmount';
import AddressClipboard from '../../components/AddressClipboard';
import NetworkStatus from './components/NetworkStatus';
import Breadcrumb from './components/Breadcrumb';
import dexLogo from '../../assets/images/dex-logo.png';
import metaMaskLogo from '../../assets/images/metamask-logo.png';
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
  align-items: center;
  padding: 22px 90px;
`;
const InnerBoxHeader = styled(InnerBoxShared)`
  grid-area: header;
  background-color: #f0f0f0;
`;
const InnerBoxContent = styled(InnerBoxShared)`
  grid-area: content;
  background-color: #ffffff;
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

class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { step: 1, walletConnected: false, isSuccessful: false };
  }

  render() {
    const { step, walletConnected, isSuccessful } = this.state;
    let stepText = 'Payment Method';
    if (step === 2) {
      stepText = 'Connect Wallet';
    } else if (step === 3) {
      stepText = 'Recap & Pay';
    }

    return (
      <Layout isSlim>
        <Seo title="Invoice" />
        <div className="section">
          <Container className="container">
            <Breadcrumb step={step} text={stepText} />
            <InnerBox>
              <InnerBoxHeader>
                <BrandLogo src={starbuckLogo} />
              </InnerBoxHeader>
              <InnerBoxContent>
                {step === 1 && (
                  <React.Fragment>
                    <Tag>Total you pay</Tag>
                    <FiatAmount fiatAmount={parseFloat('14.50')} />
                    <CryptoAmount
                      cryptoCurrency="dai"
                      cryptoValue={12}
                      fiatAmount={parseFloat('14.50')}
                      hasSelection
                      handleChange={option => {
                        console.log({ selectedCurrency: option.value });
                      }}
                    />
                    <button
                      type="submit"
                      className="button is-black is-large is-fullwidth"
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
                      className="button is-large is-fullwidth"
                    >
                      <ButtonLogo src={metaMaskLogo} alt="Metamask Logo" />
                      METAMASK
                    </Button>
                  </React.Fragment>
                )}
                {step === 2 && walletConnected && (
                  <React.Fragment>
                    <Tag>Total you pay</Tag>
                    <FiatAmount fiatAmount={parseFloat('14.50')} />
                    <CryptoAmount
                      cryptoCurrency="dai"
                      cryptoValue={12}
                      fiatAmount={parseFloat('14.50')}
                      hasSelection={false}
                    />
                    <p>
                      You need to give permission for Dexpay to interact with
                      DAI
                    </p>
                    <button
                      type="submit"
                      className="button is-black is-large is-fullwidth"
                    >
                      APPROVE
                    </button>
                  </React.Fragment>
                )}
                {step === 3 && !isSuccessful && (
                  <React.Fragment>
                    <Tag>Total you pay</Tag>
                    <FiatAmount fiatAmount={parseFloat('14.50')} />
                    <CryptoAmount
                      cryptoCurrency="dai"
                      cryptoValue={12}
                      fiatAmount={parseFloat('14.50')}
                      hasSelection={false}
                    />
                    <p>
                      You need to give permission for Dexpay to interact with
                      DAI
                    </p>
                    <button
                      type="submit"
                      className="button is-black is-large is-fullwidth"
                    >
                      PAY NOW
                    </button>
                  </React.Fragment>
                )}
                {step === 3 && isSuccessful && (
                  <React.Fragment>
                    <Tag>You paid!</Tag>
                    <FiatAmount fiatAmount={parseFloat('14.50')} />
                    <CryptoAmount
                      cryptoCurrency="dai"
                      cryptoValue={12}
                      fiatAmount={parseFloat('14.50')}
                      hasSelection={false}
                    />
                    <p>
                      You need to give permission for Dexpay to interact with
                      DAI
                    </p>
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
                <AddressClipboard address="0xcgffd3h53dfsdf43g405c3647f9c2599...4j2I" />
                <NetworkStatus
                  label="Ethereum Main Network"
                  status="not connected"
                />
              </InnerBoxFooter>
            </InnerBox>
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
