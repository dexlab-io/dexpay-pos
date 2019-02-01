import React from 'react';
import { Trans } from 'react-i18next';

const NavTabs = ({ activeTab, onChange }) => (
  <div className="tabs">
    <ul>
      <li
        className={
          activeTab === 'numberPad' ? 'is-active has-text-weight-semibold' : ''
        }
      >
        <a onClick={() => onChange('numberPad')}>
          <Trans>Numberpad</Trans>
        </a>
      </li>
      <li
        className={
          activeTab === 'recentPayments'
            ? 'is-active has-text-weight-semibold'
            : ''
        }
      >
        <a onClick={() => onChange('recentPayments')}>
          <Trans>Recent Payments</Trans>
        </a>
      </li>
    </ul>
  </div>
);

export default NavTabs;
