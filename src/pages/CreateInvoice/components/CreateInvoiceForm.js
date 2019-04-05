// CreateInvoiceForm.js
import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { TextGroup } from '../../../components/elements';

const CreateInvoiceForm = props => {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextGroup
        name="fiatAmount"
        label="Fiat Amount"
        placeholder="100"
        value={values.fiatAmount}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fiatAmount}
      />
      <TextGroup
        name="fiatCurrency"
        label="Fiat Currency"
        placeholder="USD"
        value={values.fiatCurrency}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fiatCurrency}
      />
      <button
        type="submit"
        className={`button is-large is-black is-fullwidth ${isSubmitting &&
          'is-loading'}`}
      >
        CREATE
      </button>
    </form>
  );
};

CreateInvoiceForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    fiatAmount: '',
    fiatCurrency: ''
  }),
  validationSchema: yup.object().shape({
    fiatAmount: yup.string().required('Fiat Amount is required!'),
    fiatCurrency: yup.string().required('Fiat Currency is required!')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.addContact(values);
    setSubmitting(false);
  },
  displayName: 'CreateInvoiceForm' // helps with React DevTools
})(CreateInvoiceForm);
