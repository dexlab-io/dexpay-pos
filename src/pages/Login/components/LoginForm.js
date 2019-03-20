import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { TextGroup } from '../../../components/elements';

const LoginForm = props => {
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
        onChange={handleChange}
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
        LOG IN
      </button>
    </form>
  );
};

LoginForm.propTypes = {
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
      .required('Password is required!')
      .min(6, 'Min 6 charactes required')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.handleSubmit(values);
    setSubmitting(false);
  },
  displayName: 'LoginForm' // helps with React DevTools
})(LoginForm);
