import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import { Slider } from '../../components/elements';
import settingsItems from './components/settingsItems';

const query = gql`
  {
    requiredConfirmations @client
  }
`;

const mutation = gql`
  mutation updateRequiredConfirmations($confirmation: String!) {
    updateRequiredConfirmations(confirmation: $confirmation) @client
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
  handleChange = confirmation => {
    apolloClient.mutate({ mutation, variables: { confirmation } });
  };

  render() {
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
            <Query query={query} fetchPolicy="cache-and-network">
              {({ data, loading, error }) => {
                if (loading && !data.requiredConfirmations)
                  return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                // console.log('data', data.requiredConfirmations);

                return (
                  <SliderContainer>
                    <SliderLabel className="has-text-weight-semibold">
                      Number of blocks
                    </SliderLabel>
                    <SliderValue>{data.requiredConfirmations}</SliderValue>
                    <SliderWrapper>
                      <Slider
                        value={data.requiredConfirmations}
                        onChange={this.handleChange}
                      />
                    </SliderWrapper>
                  </SliderContainer>
                );
              }}
            </Query>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RequiredConfirmations;
