import React from 'react';
import styled from 'styled-components';

import PaymentItem from './PaymentItem';
import cryptoIcon from '../../../../assets/dummy/crypto-icon.png';

const Container = styled.div``;

const payments = [
  {
    id: 1,
    time: '2018-11-10 12:12:12',
    hash: '0xf3587c31b1ae04e244ec16a1c0d796895eaafdeaa2f3b6c9567a1d3874b70649',
    amount: '12.20',
    currency: 'eth',
    icon: cryptoIcon
  },
  {
    id: 2,
    time: '2018-12-10 12:12:12',
    hash: '0xc79f2c4f5f55e04d34a29198bdf6233ed91c3f70911d508d19eec419e7650b44',
    amount: '12.20',
    icon: cryptoIcon
  },
  {
    id: 3,
    time: '2018-05-10 12:12:12',
    hash: '0x9a02db515a8db287f5d4e5661d97091a40479949eebcaf1960675f8b29ac7a02',
    amount: '12.20',
    icon: cryptoIcon
  }
];

class RecentPayments extends React.Component {
  render() {
    return (
      <Container>
        {payments.map(item => (
          <PaymentItem key={item.id} payment={item} />
        ))}
      </Container>
    );
  }
}

export default RecentPayments;
