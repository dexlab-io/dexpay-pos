import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { TextGroup } from '../../../components/elements';

const SetPasswordForm = props => {
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
        type="password"
        name="password"
        label="Password"
        placeholder="********"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        hint="Your password should be at least 6 characters long and contain one number and one uppercase letter"
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

SetPasswordForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    password: ''
  }),
  validationSchema: yup.object().shape({
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
  displayName: 'SetPasswordForm' // helps with React DevTools
})(SetPasswordForm);
