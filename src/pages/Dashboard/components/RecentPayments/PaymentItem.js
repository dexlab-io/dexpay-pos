import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { truncateHash } from '../../../../utils/helpers';
import cryptoIcon from '../../../../assets/dummy/crypto-icon.png';
import FormatCurrency from '../../../../components/FormatCurrency';
import { getCurrencyRates } from '../../../../utils/exchangeRates';

const Container = styled.a`
  padding-left: 1.5rem;
`;
const Image = styled.img`
  margin-top: 6px;
`;

class PaymentItem extends React.Component {
  constructor(props) {
    super(props);

    const { payment } = props;
    this.state = {
      fiatAmount: payment.fiatAmount
    };
  }

  componentDidMount() {
    this.getPrice();
  }

  getPrice = async () => {
    const { fiatAmount } = this.state;
    const { payment, currency } = this.props;

    if (
      payment.fiatCurrency.length === 0 ||
      payment.fiatCurrency === currency
    ) {
      return this.setState({ fiatAmount });
    }

    const toPrice = await getCurrencyRates(payment.fiatCurrency, currency);
    const newPrice = fiatAmount * toPrice;
    return this.setState({ fiatAmount: newPrice });
  };

  render() {
    const { payment, onOpenModal, currency } = this.props;
    const { fiatAmount } = this.state;

    return (
      <Container
        onClick={() => {
          if (payment.status === 'pending') {
            onOpenModal(payment);
          } else {
            window.open(
              `https://blockscout.com/poa/dai/tx/${payment.txHash}`,
              '_blank'
            );
          }
        }}
        target="_blank"
        className="media"
      >
        <figure className="media-left">
          <p className="image is-32x32">
            <Image src={cryptoIcon} alt={payment.assetUsed} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <small className="has-text-weight-light">
                {moment(payment.createdAt).format('DD/MM/YYYY H:mm:ss')}
              </small>
              <br />
              {payment.invoiceNumber} | {payment.status} |{' '}
              {truncateHash(payment.txHash || '')}
            </p>
          </div>
        </div>
        <div className="media-right">
          <small>
            <FormatCurrency currency={currency} value={fiatAmount} />
          </small>
        </div>
      </Container>
    );
  }
}

export default PaymentItem;
