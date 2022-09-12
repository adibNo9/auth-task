import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export const useFormikdata = (users, setIsUserLoggedIn, setLoginError, setButtonError) => {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

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
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: ( values) => {
      const user = users.find((user) =>
        user.email === values.email && user.password === values.password
          ? user.id
          : ''
      );

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

  return formik;
};
