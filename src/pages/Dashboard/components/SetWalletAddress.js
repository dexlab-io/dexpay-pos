import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import apolloClient from '../../../utils/apolloClient';
import WalletAddressForm from '../../Settings/components/WalletAddressForm';
import logo from '../../../assets/images/dex-logo-large.png';

const mutation = gql`
  mutation updateWalletAddress($address: String!) {
    updateWalletAddress(address: $address) @client
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const BlackBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  width: 40px;
  height: 40px;
  margin-bottom: 30px;
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
const ButtonText = styled.p`
  margin-bottom: 30px;
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
    apolloClient.mutate({
      mutation,
      variables: { address: data.walletAddress }
    });
  };

  render() {
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
        <OrText>OR</OrText>
        {/* <ButtonText>Use one of the following services</ButtonText> */}
        <Button type="submit" className="button is-large is-black">
          Connect with METAMASK
        </Button>
        <Button
          onClick={() => window.location.replace('/login')}
          type="submit"
          className="button is-large is-black"
        >
          Login
        </Button>
      </Container>
    );
  }
}

export default SetWalletAddress;
