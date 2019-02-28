import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import apolloClient from '../../../utils/apolloClient';
import WalletAddressForm from '../../Settings/components/WalletAddressForm';

const mutation = gql`
  mutation updateWalletAddress($address: String!) {
    updateWalletAddress(address: $address) @client
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;
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
  margin-bottom: 10px;
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
        <BlackBox>
          <span>🧾</span>
        </BlackBox>
        <Title>You need to add a Wallet!!</Title>
        <FormContainer>
          <WalletAddressForm
            initialValues={{ walletAddress: '' }}
            handleSubmit={this.handleAddressUpdate}
          />
        </FormContainer>
        <OrText>OR</OrText>
        <ButtonText>Use one of the following services</ButtonText>
        <Button type="submit" className="button is-large is-black">
          METAMASK
        </Button>
        <Button type="submit" className="button is-large is-black">
          WALLET CONNECT
        </Button>
      </Container>
    );
  }
}

export default SetWalletAddress;
