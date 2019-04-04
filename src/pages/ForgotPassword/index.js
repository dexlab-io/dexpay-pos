import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import logo from '../../assets/images/dex-logo-large.png';

const mutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(input: { email: $email }) {
      success
    }
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
const P = styled.p`
  text-align: center;
  margin-top: 10px;
`;

class ForgotPassword extends React.Component {
  onSuccess = () => {
    swal(
      'Success!',
      'Please check your email, we have sent instructions to reset password.'
    );
  };

  render() {
    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Forgot Password" />
        <div className="section">
          <Container className="container">
            <Logo src={logo} alt="Dexpay logo" />
            <Tagline className="has-text-weight-semibold">
              Do you want to reset your password?
            </Tagline>
            <P>
              Please fill your email address in order to
              <br /> reset your password and create a new one
            </P>
            <Mutation
              mutation={mutation}
              update={this.onSuccess}
              onError={error => {
                swal(
                  'Issue!',
                  error.message.replace('GraphQL error: ', ''),
                  'warning'
                );
              }}
            >
              {forgotPassword => (
                <React.Fragment>
                  <ForgotPasswordForm
                    handleSubmit={data => {
                      forgotPassword({
                        variables: data
                      });
                    }}
                  />
                </React.Fragment>
              )}
            </Mutation>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default ForgotPassword;
