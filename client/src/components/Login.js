// Login.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import useAuthStore from './authStore';


function Login() {
  const history = useHistory();
  const { login } = useAuthStore();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values, history);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  
    setSubmitting(false); // Reset submitting state
  };
  
  

  return (
    <div className="login-container"> {/* Add class name for container */}
      <h2 className="login-title">Login</h2> {/* Add class name for title */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="login-form"> {/* Add class name for form */}
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-input" /> {/* Add class name for input */}
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-input" /> {/* Add class name for input */}
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting} className="form-button">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      <div className="signup-link">
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
