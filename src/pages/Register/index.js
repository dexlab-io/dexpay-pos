import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import RegisterForm from './components/RegisterForm';
import logo from '../../assets/images/dex-logo-large.png';

const registerMutation = gql`
  mutation register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
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

class Register extends React.Component {
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('token');
    this.state = {
      isLoggedIn: !!token
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;
    const { history } = this.props;

    if (isLoggedIn) {
      history.push('/dashboard');
    }
  }

  onRegisterSuccess = async (cache, { data: { login } }) => {
    // console.log('onRegisterSuccess', login);
    // store token in local storage
    localStorage.setItem('token', login.jwt);
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
              mutation={registerMutation}
              update={this.onLoginSuccess}
              onError={() => {
                swal('Issue!', 'Invalid email or password', 'warning');
              }}
              onCompleted={() => {
                history.push('/dashboard');
              }}
            >
              {register => (
                <React.Fragment>
                  <RegisterForm
                    handleSubmit={data => {
                      // console.log('login form', data);
                      register({
                        variables: data
                      });
                    }}
                  />
                </React.Fragment>
              )}
            </Mutation>
            <OrText>OR</OrText>
            <ButtonText to="/login">Use an Existing Account</ButtonText>
            <ButtonText to="/dashboard">Continue without an Account</ButtonText>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Register;
