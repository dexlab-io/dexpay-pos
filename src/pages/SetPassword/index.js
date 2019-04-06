import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SetPasswordForm from './components/SetPasswordForm';
import logo from '../../assets/images/dex-logo-large.png';

const mutation = gql`
  mutation setNewPassword($password: String!, $token: String!) {
    setNewPassword(input: { password: $password, token: $token }) {
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
  text-align: center;
`;

class SetPassword extends React.Component {
  onSuccess = () => {
    swal('Success!', 'Password has been set, please login.');
  };

  render() {
    const { match } = this.props;
    const { token } = match.params;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Set Password" />
        <div className="section">
          <Container className="container">
            <Logo src={logo} alt="Dexpay logo" />
            <Tagline className="has-text-weight-semibold">
              You have request to reset your password
              <br />
              Enter a new password now
            </Tagline>
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
              {setNewPassword => (
                <React.Fragment>
                  <SetPasswordForm
                    handleUpdate={data => {
                      return setNewPassword({
                        variables: { password: data.password, token }
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

export default SetPassword;
