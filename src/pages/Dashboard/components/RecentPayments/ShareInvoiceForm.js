import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import swal from 'sweetalert';

import { TextGroup } from '../../../../components/elements';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShareInvoiceForm = props => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <TextGroup
        isVertical
        name="customerEmail"
        placeholder="Customer email address"
        value={values.customerEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.customerEmail}
      />
      <button
        type="submit"
        className={`button is-black is-uppercase is-medium ${isSubmitting &&
          'is-loading'}`}
      >
        Send
      </button>
    </Form>
  );
};

ShareInvoiceForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    customerEmail: ''
  }),
  validationSchema: yup.object().shape({
    customerEmail: yup
      .string()
      .required('Wallet Adress is required!')
      .email('Invalid email address')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props
      .handleUpdate(values)
      .then(() => {
        swal('Success!', 'Invoice sent successfully!', 'success');
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  displayName: 'ShareInvoiceForm' // helps with React DevTools
})(ShareInvoiceForm);
