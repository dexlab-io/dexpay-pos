import React from 'react';
import { Trans } from 'react-i18next';

const GenerateBillBtn = ({ handlePay }) => (
  <button
    type="submit"
    className="button is-black is-uppercase is-large is-fullwidth"
    onClick={handlePay}
  >
    <Trans>Generate bill</Trans>
  </button>
);

export default GenerateBillBtn;
