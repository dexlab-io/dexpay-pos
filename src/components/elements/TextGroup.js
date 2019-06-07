import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  padding: 20px 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const Label = styled.label`
  text-align: left;
`;
const Input = styled.input`
  border: none;
  box-shadow: none;
`;
const Hint = styled.p`
  color: #929292;
  width: 90%;
`;

const TextGroup = ({
  label,
  placeholder,
  error,
  hint,
  isVertical,
  ...otherProps
}) => (
  <Field className={`field ${isVertical ? '' : 'is-horizontal'}`}>
    {label && (
      <div className="field-label is-normal">
        <Label className="label">{label}</Label>
      </div>
    )}
    <div className="field-body">
      <div className="field">
        <div className="control">
          <Input
            className="input"
            type="text"
            placeholder={placeholder}
            {...otherProps}
          />
          {hint && <Hint className="help">{hint}</Hint>}
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  </Field>
);

export default TextGroup;
