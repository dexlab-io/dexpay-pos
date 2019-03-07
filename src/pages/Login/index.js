import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
      }
    }
  }
`;

const Container = styled.div`
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
    // store token in local storage
    window.localStorage.setItem('token', login.jwt);
  };

  render() {
    const { history } = this.props;

    return (
      <Layout>
        <Seo title="Login" />
        <div className="section">
          <Container className="container">
            <Logo src={logo} alt="dex logo" />
            <Tagline>Take your shop to the future</Tagline>
            <Tagline>Sign Up for free now</Tagline>
            <Mutation
              mutation={loginMutation}
              update={this.onLoginSuccess}
              onError={() => {
                swal('Issue!', 'Invalid email or password', 'warning');
              }}
              onCompleted={() => {
                history.push('/dashboard');
              }}
            >
              {(login, { error }) => (
                <React.Fragment>
                  <LoginForm
                    handleSubmit={data => {
                      // console.log('login form', data);
                      login({
                        variables: data
                      });
                    }}
                  />
                  {error && <p>Error: {error.message}</p>}
                </React.Fragment>
              )}
            </Mutation>
            <OrText>OR</OrText>
            <ButtonText to="/">Create a new account</ButtonText>
            <ButtonText to="/login">Forgot password?</ButtonText>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Login;
