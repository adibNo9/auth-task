import './signup.css';
import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setUserSignup }) => {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length < 4 ) {
      errors.username = 'Must be 4 characters or more';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then((res) => res.json())
      .then((data) => console.log(data));

      navigate('/login');
      setUserSignup((prevUsers) => [...prevUsers, values]);
    }
  })

  return (
    <div className="ui segment formContainer">
      <div className="cardHeader">
        <h1 className="ui header">Sign Up</h1>
        <p>sign up and show your location to another users!</p>
      </div>
      <form onSubmit={formik.handleSubmit} className="ui form">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error">{formik.errors.username}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">E-Mail</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="field">
          <div className="ui termParagraph">
            <p>
              By selecting Create account you agree to our{' '}
              <span className="termLink">Terms</span> and have read our{' '}
              <span className="termLink">Global Privacy Statement</span>.
            </p>
          </div>
        </div>
        <button className="ui button" type="submit">
          Create account
        </button>
      </form>
    </div>
  );
}

export default Signup;