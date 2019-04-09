import React from 'react';
import styled from 'styled-components';
// import moment from 'moment';
import { truncateHash } from '../../../../utils/helpers';
import cryptoIcon from '../../../../assets/dummy/crypto-icon.png';
import FormatCurrency from '../../../../components/FormatCurrency';

const Container = styled.a`
  padding-left: 1.5rem;
`;
const Image = styled.img`
  margin-top: 6px;
`;

const PaymentItem = ({ payment }) => (
  <Container
    href={`/invoice/${payment.invoiceNumber}`}
    target="_blank"
    className="media"
  >
    <figure className="media-left">
      <p className="image is-32x32">
        <Image src={cryptoIcon} alt={payment.processedType} />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <small className="has-text-weight-light">{payment.createdAt}</small>
          <br />
          {payment.invoiceNumber} | {payment.status} |{' '}
          {truncateHash(payment.txHash || '')}
        </p>
      </div>
    </div>
    <div className="media-right">
      <small>
        <FormatCurrency
          currency={payment.fiatCurrency}
          value={payment.fiatAmount}
        />
      </small>
    </div>
  </Container>
);

export default PaymentItem;
