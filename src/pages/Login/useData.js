import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const useFormikdata = (
  setIsUserLoggedIn,
  setLoginError,
  setButtonError
) => {
  const [isloading, setIsloading] = useState(false);
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
      setIsloading(true);
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((res) => {
        setIsloading(false);
        if (res.ok) {
          setIsUserLoggedIn(true);
          window.localStorage.setItem("isloggedIn", true);
          navigate("/");
        } else {
          return res.json().then((data) => {
            setLoginError(data);
            setButtonError(true);
          });
        }
      });
    },
  });

  return [formik, isloading];
};
