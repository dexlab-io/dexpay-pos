import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import WalletAddressForm from '../../Settings/components/WalletAddressForm';
import logo from '../../../assets/images/dex-logo-large.png';
import client from '../../../utils/apolloClient';
import EthereumHDWallet from '../../../class/ethereum/EthereumHDWallet';

const mutation = gql`
  mutation updateWalletAddress($address: String!, $source: String) {
    updateWalletAddress(address: $address, source: $source) @client
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;
const Title = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;
const FormContainer = styled.div`
  border-top: 1px solid #d6d6d6;
`;
const OrText = styled.p`
  font-size: 30px;
`;
const Button = styled.button`
  margin: 10px 0px;
`;

const Logo = styled.img`
  width: 124px;
  height: auto;
  margin-bottom: 30px;
`;

class SetWalletAddress extends React.Component {
  handleAddressUpdate = data => {
    client.mutate({
      mutation,
      variables: { address: data.walletAddress }
    });
  };

  handleUseMetamask = async () => {
    const wallet = new EthereumHDWallet();
    await wallet.setWeb3();
    const metaMaskAddress = wallet.getAddress();
    // update cache
    if (metaMaskAddress) {
      client.mutate({
        mutation,
        variables: { address: metaMaskAddress, source: 'web3js' }
      });
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Container>
        <Logo src={logo} alt="Dexpay logo" />
        <Title>Add an Ethereum Wallet Address</Title>
        <Title>to use the Point Of Sale</Title>
        <FormContainer>
          <WalletAddressForm
            column
            initialValues={{ walletAddress: '' }}
            handleSubmit={this.handleAddressUpdate}
          />
        </FormContainer>

        {window.web3 || !isLoggedIn ? <OrText>OR</OrText> : null}
        {/* <ButtonText>Use one of the following services</ButtonText> */}
        {window.web3 ? (
          <Button
            type="button"
            onClick={this.handleUseMetamask}
            className="button is-large is-black"
          >
            Connect with METAMASK
          </Button>
        ) : null}

        {!isLoggedIn ? (
          <Button
            onClick={() => window.location.replace('/login')}
            type="submit"
            className="button is-large is-black"
          >
            Login
          </Button>
        ) : null}
      </Container>
    );
  }
}

export default SetWalletAddress;
