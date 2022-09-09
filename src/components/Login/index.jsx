import "./login.css";
import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//locals
import { useData } from "./useData";

const Login = ({ onCheckUser }) => {
    const { formik } = useData(onCheckUser);
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
          <div className="ui">
            <p>
              Not registered yet? <Link to="/signup">Create an Account</Link>
            </p>
          </div>
        </div>
        <button className="ui button" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
