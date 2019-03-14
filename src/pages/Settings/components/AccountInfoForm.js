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
        name="shopName"
        label="Shop Name"
        placeholder="John's Shop"
        value={values.shopName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.shopName}
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
      <button type="submit" className="button is-black is-uppercase is-large">
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
    shopName: props.initialValues.store.name || '',
    email: props.initialValues.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }),
  validationSchema: yup.object().shape({
    shopName: yup.string().required('Shop name is required!'),
    email: yup.string().required('Email is required!')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.handleSubmit(values);
    setSubmitting(false);
  },
  displayName: 'AccountInfoForm' // helps with React DevTools
})(AccountInfoForm);
