import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { TextGroup } from '../../../components/elements';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WalletAddressForm = props => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    column
  } = props;

  const innerForm = (
    <React.Fragment>
      <TextGroup
        name="walletAddress"
        label="Address"
        placeholder="Paste or Scan your public address"
        value={values.walletAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.walletAddress}
      />
      <button
        type="submit"
        className={`button is-black is-uppercase is-large ${isSubmitting &&
          'is-loading'}`}
      >
        Save
      </button>
    </React.Fragment>
  );

  return column ? (
    <Form onSubmit={handleSubmit}>{innerForm}</Form>
  ) : (
    <form onSubmit={handleSubmit}>{innerForm}</form>
  );
};

WalletAddressForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: props => ({
    walletAddress: props.initialValues.walletAddress || ''
  }),
  validationSchema: yup.object().shape({
    walletAddress: yup.string().required('Wallet Adress is required!')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.handleSubmit(values);
    setSubmitting(false);
  },
  displayName: 'WalletAddressForm' // helps with React DevTools
})(WalletAddressForm);
