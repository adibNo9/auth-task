import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const useFormikSignup = () => {
  const [err, setErr] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length < 4) {
      errors.username = "Must be 4 characters or more";
    }

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
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setIsloading(true);
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        setIsloading(false);
        if (res.ok) {
          navigate("/login");
        } else {
          return res.json().then((data) => {
            setErr(data);
          });
        }
      });
    },
  });

  return [formik, isloading, err];
};
