import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { TextGroup } from '../../../components/elements';

const AccountInfoForm = props => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextGroup
        name="fullName"
        label="Your Name"
        placeholder="John Doe"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fullName}
      />
      <TextGroup
        name="storeName"
        label="Store Name"
        placeholder="John's Shop"
        value={values.storeName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.storeName}
      />
      <TextGroup
        name="email"
        label="Email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />
      <TextGroup
        type="password"
        name="currentPassword"
        label="Current Password"
        placeholder="Your Current Password"
        value={values.currentPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.currentPassword}
      />
      <TextGroup
        type="password"
        name="newPassword"
        label="New Password"
        placeholder="Set new password"
        value={values.newPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.newPassword}
      />
      <TextGroup
        type="password"
        name="confirmNewPassword"
        label="Confirm Password"
        placeholder="Confirm new password again"
        value={values.confirmNewPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmNewPassword}
      />
      <button
        type="submit"
        className="button is-black is-uppercase is-large is-fullwidth"
      >
        Save
      </button>
    </form>
  );
};

AccountInfoForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: props => ({
    fullName: props.initialValues.profile.fullName || '',
    storeName: props.initialValues.store.name || '',
    email: props.initialValues.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }),
  validationSchema: yup.object().shape({
    storeName: yup.string().required('Store name is required!'),
    email: yup.string().required('Email is required!')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.handleSubmit(values);
    setSubmitting(false);
  },
  displayName: 'AccountInfoForm' // helps with React DevTools
})(AccountInfoForm);
