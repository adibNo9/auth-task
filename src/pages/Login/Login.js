import "./login.css";
import React, { useState ,useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ users, setIsUserLoggedIn }) => {
  const [loginError, setLoginError] = useState(false);
  const [buttonError, setButtonError] =useState(false);

  useEffect(() => {
    let clearError = setTimeout(() => {
      setButtonError(false)
    }, 300);

    return () => {
      clearTimeout(clearError);
    }
  })


  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const user = users.find(user => user.email === values.email && user.password === values.password ? user.id : '');

      if (user) {
        setIsUserLoggedIn(true);
        window.localStorage.setItem('isloggedIn', true);
        navigate('/');
      } else {
        setLoginError(true);
        setButtonError(true);
      }
    },
  });

  return (
    <div className="ui segment formContainer">
      <div className="cardHeader">
        <h1 className="ui header">Login</h1>
        <p>set your location in the app and enjoy...</p>
      </div>
      <form onSubmit={formik.handleSubmit} className="ui form">
        <div className="field">
          <label htmlFor="email">E-Mail</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            id="email"
            type="email"
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
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="field">
          <div className="ui formText">
            {loginError ? (
              <p className="error">
                username or password is wrong!{' '}
                <span className="tryAgain">
                  try again or <Link to="/signup">Create an Account</Link>
                </span>
              </p>
            ) : (
              <p>
                Not registered yet? <Link to="/signup">Create an Account</Link>
              </p>
            )}
          </div>
        </div>
        <button
          className={`buttonStyle submitBtn ${buttonError && 'shake'}`}
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
