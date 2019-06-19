import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import gql from 'graphql-tag';

import ShareInvoiceForm from './ShareInvoiceForm';
import apolloClient from '../../../../utils/apolloClient';
import dexLogo from '../../../../assets/images/dex-logo-white.png';

const mutation = gql`
  mutation updateInvoice($id: ID!, $customerEmail: String!) {
    updateInvoice(id: $id, input: { customerEmail: $customerEmail }) {
      id
    }
  }
`;

const Share = styled.div`
  text-align: right;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;
  padding: 2rem;
  border-radius: 12px 12px 0 0;
`;
const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
`;

class ShareInvoice extends React.Component {
  state = { isModalOpen: false };

  handleSendInvoice = ({ customerEmail }) => {
    const { payment } = this.props;
    return apolloClient.mutate({
      mutation,
      variables: { id: payment.id, customerEmail }
    });
  };

  renderModal() {
    const { isModalOpen } = this.state;

    return (
      <Modal
        open={isModalOpen}
        onClose={() => this.setState({ isModalOpen: false })}
        center
        showCloseIcon={false}
        styles={{
          modal: {
            maxWidth: 'initial',
            width: '600px',
            maxHight: '770px',
            height: 'auto',
            borderRadius: '12px',
            padding: 0
          }
        }}
      >
        <Header>
          <Logo src={dexLogo} alt="Dexpay logo" />
        </Header>
        <Content>
          <p className="is-size-4 has-text-weight-semibold">
            Send this transaction details by email
          </p>
          <ShareInvoiceForm handleUpdate={this.handleSendInvoice} />
        </Content>
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Share onClick={() => this.setState({ isModalOpen: true })}>
          <i className="fas fa-share-alt" />
        </Share>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

export default ShareInvoice;
