import "./login.css";
import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/UI/ErrorModal";

const Login = ({ onCheckUser, showPopup, onHidePopUp }) => {
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
      onCheckUser(values);
    },
  });

  const signupHandler = () => {
    navigate("/signup");
  };

  const cancleSignupHandler = () => {
    onHidePopUp();
  };
  return (
    <>
      {showPopup && (
        <ErrorModal
          actionButton="Sign Up"
          cancleButton="Cancle"
          onDeletePost={signupHandler}
          onCancleDelete={cancleSignupHandler}
          title="Sign Up First"
          message="Username or Password wrong! if you not regerstered, create account first."
        />
      )}
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
          <button className="buttonStyle submitBtn" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
