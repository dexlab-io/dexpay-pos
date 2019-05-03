import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import LoginForm from './components/LoginForm';
import logo from '../../assets/images/dex-logo-large.png';

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
        profile {
          fullName
        }
        store {
          name
          walletAddress
          currency
          acceptedTokens
          requiredConfirmations {
            token
            confirmations
          }
        }
      }
    }
  }
`;

const mutation = gql`
  mutation updateWalletAddress(
    $acceptedTokens: [String]!
    $currency: String!
    $walletAddress: String!
    $requiredConfirmations: RequiredConfirmationsInput
  ) {
    updateAcceptedTokens(tokens: $acceptedTokens) @client
    updateCurrency(currency: $currency) @client
    updateWalletAddress(address: $walletAddress) @client
    setRequiredConfirmations(requiredConfirmations: $requiredConfirmations)
      @client
  }
`;

const Container = styled.div`
  margin-top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 124px;
  height: auto;
  margin-bottom: 30px;
`;
const Tagline = styled.h3`
  font-size: 20px;
`;

const OrText = styled.p`
  font-size: 20px;
  margin: 20px 0;
`;
const ButtonText = styled(Link)`
  margin-bottom: 30px;
`;

class Login extends React.Component {
  onLoginSuccess = async (cache, { data: { login } }) => {
    // console.log('onLoginSuccess', login);
    const { user, jwt } = login;
    // store token in local storage
    await window.localStorage.setItem('token', jwt);
    const requiredConfirmations = user.store.requiredConfirmations.map(
      confirmation => ({
        ...confirmation,
        __typename: 'Confirmation'
      })
    );

    // sync data with local store
    apolloClient
      .mutate({
        mutation,
        variables: {
          acceptedTokens: user.store.acceptedTokens,
          currency: user.store.currency,
          walletAddress: user.store.walletAddress,
          requiredConfirmations
        }
      })
      .then(() => {
        // redirect to dashboard
        setTimeout(() => {
          window.location.replace('/dashboard');
        }, 1000);
      });
  };

  render() {
    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Login" />
        <div className="section">
          <Container className="container">
            <Logo src={logo} alt="Dexpay logo" />
            <Tagline>Take your shop to the future</Tagline>
            <Mutation
              mutation={loginMutation}
              update={this.onLoginSuccess}
              onError={error => {
                swal(
                  'Issue!',
                  error.message.replace('GraphQL error: ', ''),
                  'warning'
                );
              }}
            >
              {login => (
                <LoginForm
                  handleUpdate={data => {
                    // console.log('login form', data);
                    return login({
                      variables: data
                    });
                  }}
                />
              )}
            </Mutation>
            <OrText>OR</OrText>
            <ButtonText to="/">Create a new account</ButtonText>
            <ButtonText to="/forgot-password">Forgot password?</ButtonText>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Login;
