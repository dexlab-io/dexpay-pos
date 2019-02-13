import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import { Slider } from '../../components/elements';

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
  state = { value: 50 };

  render() {
    const { history } = this.props;
    const { value } = this.state;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Required Confirmations" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb
              history={history}
              title="Required Confirmations"
              icon="link-icon.png"
            />
            <SliderContainer>
              <SliderLabel className="has-text-weight-semibold">
                Number of blocks
              </SliderLabel>
              <SliderValue>{value}</SliderValue>
              <SliderWrapper>
                <Slider
                  value={value}
                  onChange={e => this.setState({ value: e.target.value })}
                />
              </SliderWrapper>
            </SliderContainer>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RequiredConfirmations;
