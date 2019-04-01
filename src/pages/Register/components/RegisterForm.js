import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { TextGroup } from '../../../components/elements';

const RegisterForm = props => {
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
      <TextGroup
        type="password"
        name="password"
        label="Password"
        placeholder="********"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
      />
      <button
        type="submit"
        className={`button is-large is-black is-fullwidth ${isSubmitting &&
          'is-loading'}`}
      >
        CREATE ACCOUNT
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Required valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Min 6 charactes required')
      .matches(/(?=.*\d)/, { message: 'At least one digit exists' })
      .matches(/(?=.*[a-z])/, {
        message: 'At least one lower case letter required'
      })
      .matches(/(?=.*[A-Z])/, {
        message: 'At least one upper case letter required'
      })
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.handleSubmit(values);
    setSubmitting(false);
  },
  displayName: 'RegisterForm' // helps with React DevTools
})(RegisterForm);
