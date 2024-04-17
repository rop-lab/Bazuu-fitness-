// SignUp.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';


function SignUp() {
  const history = useHistory();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Your signup logic here
    console.log(values);

    // Example: Redirect to login page after successful signup
    history.push('/login');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" className="form-input" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-input" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-input" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-input" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting} className="form-button">
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
      <div className="signup-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
