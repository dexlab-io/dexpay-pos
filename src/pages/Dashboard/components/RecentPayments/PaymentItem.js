import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { truncateHash, formatCurrency } from '../../../../utils/helpers';

const Container = styled.article``;
const Image = styled.img`
  margin-top: 6px;
`;

const PaymentItem = ({ payment }) => (
  <Container className="media">
    <figure className="media-left">
      <p className="image is-32x32">
        <Image src={payment.icon} alt={payment.currency} />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <small className="has-text-weight-light">
            {moment(payment.time).fromNow()}
          </small>
          <br />
          {truncateHash(payment.hash)}
        </p>
      </div>
    </div>
    <div className="media-right">
      <small className="has-text-weight-light">
        {formatCurrency(payment.amount)}
      </small>
    </div>
  </Container>
);

export default PaymentItem;
