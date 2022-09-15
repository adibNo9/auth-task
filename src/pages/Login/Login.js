import "./login.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormikdata } from "./useData";

const Login = ({ setIsUserLoggedIn }) => {
  const [loginError, setLoginError] = useState("");
  const [buttonError, setButtonError] = useState(false);
  const [formik, isloading] = useFormikdata(
    setIsUserLoggedIn,
    setLoginError,
    setButtonError
  );

  useEffect(() => {
    let clearError = setTimeout(() => {
      setButtonError(false);
    }, 300);

    return () => {
      clearTimeout(clearError);
    };
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
                {loginError}{" "}
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
        {!isloading ? (
          <button
            className={`buttonStyle submitBtn ${buttonError && "shake"}`}
            type="submit"
          >
            LOGIN
          </button>
        ) : (
          <div class="ui active centered inline loader"></div>
        )}
      </form>
    </div>
  );
};

export default Login;
