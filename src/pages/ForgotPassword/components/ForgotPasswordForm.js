import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { TextGroup } from '../../../components/elements';

const ForgotPasswordForm = props => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextGroup
        name="email"
        label="Email"
        placeholder="Your email address"
        value={values.email}
        onChange={e => {
          e.target.value = e.target.value.trim();
          handleChange(e);
        }}
        onBlur={handleBlur}
        error={errors.email}
      />
      <button
        type="submit"
        className={`button is-large is-black is-fullwidth ${isSubmitting &&
          'is-loading'}`}
      >
        RESET PASSWORD
      </button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    email: ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Required valid email address')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.handleUpdate(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ForgotPasswordForm' // helps with React DevTools
})(ForgotPasswordForm);
