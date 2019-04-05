import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  padding: 20px 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const Label = styled.label`
  text-align: left;
`;

const SelectGroup = ({ label, placeholder, error, options, ...otherProps }) => (
  <Field className="field is-horizontal">
    <div className="field-label is-normal">
      <Label className="label">{label}</Label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">
          <div className="select">
            <select {...otherProps}>
              <option>{placeholder}</option>
              {options.map(option => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  </Field>
);

export default SelectGroup;
