import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

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

class Login extends React.Component {
  onLoginSuccess = async (cache, { data: { login } }) => {
    console.log('onLoginSuccess', login);
    // store token in local storage
    // await AsyncStorage.setItem('token', telephoneLogin.jwt);
    localStorage.setItem('token', login.jwt);
    // update local store
    // await apolloClient.mutate({
    //   mutation: toggleIsLoggedInMutation,
    //   variables: { isLoggedIn: true },
    // });
  };

  render() {
    return (
      <Layout>
        <Seo title="Login" />
        <div className="section">
          <div className="container">
            <h2 className="title">Login</h2>
            <Mutation
              mutation={loginMutation}
              update={this.onLoginSuccess}
              onError={() => {
                swal('Issue!', 'Invalid email or password', 'warning');
              }}
            >
              {(login, { loading, error }) => (
                <React.Fragment>
                  <button
                    type="submit"
                    className={`button is-primary ${loading && 'is-loading'}`}
                    onClick={() =>
                      login({
                        variables: {
                          email: 'perminder.klair@gmail.com',
                          password: '123456'
                        }
                      })
                    }
                  >
                    Login
                  </button>
                  {error && <p>Error: {error.message}</p>}
                </React.Fragment>
              )}
            </Mutation>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
