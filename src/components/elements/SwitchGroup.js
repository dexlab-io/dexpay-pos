import React from 'react';
import '../../../node_modules/bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css';

const SwitchGroup = ({ label, placeholder, error, ...otherProps }) => (
  <div className="field">
    <input type="checkbox" className="switch is-rounded" {...otherProps} />
    <label htmlFor="switchRoundedOutlinedDefault">{label}</label>
  </div>
);

export default SwitchGroup;
