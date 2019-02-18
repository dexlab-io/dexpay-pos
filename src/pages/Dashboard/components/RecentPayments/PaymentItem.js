import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { truncateHash, formatCurrency } from '../../../../utils/helpers';
import cryptoIcon from '../../../../assets/dummy/crypto-icon.png';

const Container = styled.a``;
const Image = styled.img`
  margin-top: 6px;
`;

const PaymentItem = ({ payment }) => (
  <Container
    href={`https://blockscout.com/poa/dai/tx/${payment.transactionHash}`}
    target="_blank"
    className="media"
  >
    <figure className="media-left">
      <p className="image is-32x32">
        <Image src={cryptoIcon} alt={payment.currency} />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <small className="has-text-weight-light">
            {moment.unix(payment.timestamp).fromNow()}
          </small>
          <br />
          {truncateHash(payment.transactionHash)}
        </p>
      </div>
    </div>
    <div className="media-right">
      <small>{formatCurrency(payment.value)}</small>
    </div>
  </Container>
);

export default PaymentItem;
