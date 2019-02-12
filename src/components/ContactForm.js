import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

const ContactForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Full name</label>
        <div className="control">
          <input
            className="input"
            name="name"
            placeholder="Full Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <p className="help is-danger">{errors.name}</p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Your Email</label>
        <div className="control">
          <input
            className="input"
            name="email"
            placeholder="Your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="help is-danger">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className="textarea"
            name="message"
            placeholder="Enter your message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.message && touched.message && (
            <p className="help is-danger">{errors.message}</p>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    message: ''
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Full name is required!'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    message: yup.string().required('Message is required!')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.addContact(values);
    setSubmitting(false);
  },
  displayName: 'ContactUs' // helps with React DevTools
})(ContactForm);
