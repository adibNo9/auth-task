import "./signup.css";
import { useFormikSignup } from "./useData";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formik, isloading, err] = useFormikSignup();

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
        {!err && (
          <div className="field">
            <div className="ui termParagraph">
              <p>
                By selecting Create account you agree to our{" "}
                <span className="termLink">Terms</span> and have read our{" "}
                <span className="termLink">Global Privacy Statement</span>.
              </p>
            </div>
          </div>
        )}
        {err && (
          <p className="error">
            {err}
            {"   "}
            <span className="tryAgain">
              try again or <Link to="/login">Login</Link> with existing account
            </span>
          </p>
        )}
        {!isloading ? (
          <button className="buttonStyle submitBtn" type="submit">
            Create account
          </button>
        ) : (
          <div className="ui active centered inline loader"></div>
        )}
      </form>
    </div>
  );
};

export default Signup;
