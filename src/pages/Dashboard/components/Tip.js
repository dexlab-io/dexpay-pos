import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import QrCode from '../../Payment/components/QrCode';

class Tip extends Component {
  render() {
    return (
      <Modal open={true} onClose={this.props.onClose}>
        <QrCode valueCrypto="0" />
      </Modal>
    );
  };
};

export default Tip;
