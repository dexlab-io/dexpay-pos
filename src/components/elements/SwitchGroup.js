import React from 'react';
import Switch from 'react-switch';

const SwitchGroup = ({ label, ...otherProps }) => (
  <div className="field">
    <Switch uncheckedIcon={false} checkedIcon={false} {...otherProps} />
    <label htmlFor="switchRoundedOutlinedDefault">{label}</label>
  </div>
);

export default SwitchGroup;
