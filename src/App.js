import { useEffect, useState } from 'react';

import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";


function App() {
  const [users, setUsers] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const logOutHandler = () => {
    setIsUserLoggedIn(false);
  }

  const isUserHasAcc = (values) => {
    users.find(user => {
      if (user.email === values.email) {
         console.log("you are our user, email is true");
        if (user.password === values.password) {
          console.log("password is true");
          setIsUserLoggedIn(true);
          return isUserLoggedIn;
        } else {
          console.log("password false")
          return false;
        }
      } else {
        console.log("he is not user")
        return false;
      }
    })
  }

  useEffect(() => {
      const getUsers = async () => {
        const response = await fetch('http://localhost:3001/users');

        const data = await response.json();
        setUsers(data);
      };

    getUsers();
  }, []);

  console.log(users)


  return (
    <BrowserRouter>
      <Navbar isUserLoggedIn={isUserLoggedIn} onLogout={logOutHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onCheckUser={isUserHasAcc} />} />
        <Route path="/signup" element={<Signup setUserSignup={setUsers} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
