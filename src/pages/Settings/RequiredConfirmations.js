import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find, findIndex } from 'lodash';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import { Slider } from '../../components/elements';
import settingsItems from './components/settingsItems';

const query = gql`
  {
    requiredConfirmations @client {
      token
      confirmations
    }
  }
`;

const mutation = gql`
  mutation updateRequiredConfirmations($token: String!, $confirmations: Int!) {
    updateRequiredConfirmations(token: $token, confirmations: $confirmations)
      @client {
      token
      confirmations
    }
    updateMe(input: { tokenName: $token, tokenConfirmations: $confirmations }) {
      id
    }
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const SliderLabel = styled.span`
  flex: 2;
`;
const SliderValue = styled.span`
  flex: 1;
  color: #9c9c9c;
`;
const SliderWrapper = styled.div`
  flex: 10;
`;

class RequiredConfirmations extends React.Component {
  constructor(props) {
    super(props);

    this.state = { confirmations: undefined };
    this.mutationTimeout = undefined;
  }

  componentWillUnmount() {
    clearTimeout(this.mutationTimeout);
  }

  handleChange = confirmation => {
    const { confirmations } = this.state;
    const selectedIndex = findIndex(confirmations, {
      token: confirmation.token
    });
    const selected = confirmations[selectedIndex];
    selected.confirmations = confirmation.confirmations;
    confirmations[selectedIndex] = selected;
    this.setState({ confirmations });

    clearTimeout(this.mutationTimeout);
    this.mutationTimeout = setTimeout(() => {
      apolloClient.mutate({ mutation, variables: { ...confirmation } });
    }, 1000);
  };

  render() {
    const { confirmations } = this.state;
    const { history } = this.props;
    const settingItem = find(settingsItems, {
      linkTo: '/settings/required-confirmations'
    });

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Required Confirmations" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb history={history} {...settingItem} />
            <Query
              query={query}
              fetchPolicy="cache-and-network"
              onCompleted={data => {
                if (!confirmations) {
                  this.setState({ confirmations: data.requiredConfirmations });
                }
              }}
            >
              {({ loading, error }) => {
                if (loading || !confirmations) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                // console.log('data', confirmations);

                return confirmations.map(item => (
                  <SliderContainer key={item.token}>
                    <SliderLabel className="has-text-weight-semibold">
                      {item.token}
                    </SliderLabel>
                    <SliderValue>{item.confirmations} Blocks</SliderValue>
                    <SliderWrapper>
                      <Slider
                        value={item.confirmations}
                        onChange={count =>
                          this.handleChange({
                            token: item.token,
                            confirmations: count
                          })
                        }
                      />
                    </SliderWrapper>
                  </SliderContainer>
                ));
              }}
            </Query>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RequiredConfirmations;
