import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import ShareInvoice from './ShareInvoice';
import { truncateHash } from '../../../../utils/helpers';
import cryptoIcon from '../../../../assets/dummy/crypto-icon.png';
import FormatCurrency from '../../../../components/FormatCurrency';

const Container = styled.div`
  padding-left: 1.5rem;
`;
const Content = styled.div`
  cursor: pointer;
`;
const Image = styled.img`
  margin-top: 6px;
`;

const PaymentItemWeb3 = ({ payment }) => (
  <Container className="media">
    <figure className="media-left">
      <p className="image is-32x32">
        <Image src={cryptoIcon} alt={payment.currency} />
      </p>
    </figure>
    <Content
      className="media-content"
      href={`https://blockscout.com/poa/dai/tx/${payment.transactionHash}`}
      target="_blank"
    >
      <div className="content">
        <p>
          <small className="has-text-weight-light">
            {moment.unix(payment.timestamp).fromNow()}
          </small>
          <br />
          {truncateHash(payment.transactionHash)}
        </p>
      </div>
    </Content>
    <div className="media-right">
      <small>
        <FormatCurrency value={parseFloat(payment.value)} />
      </small>
      <ShareInvoice payment={payment} />
    </div>
  </Container>
);

export default PaymentItemWeb3;
