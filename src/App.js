import { useEffect, useState } from 'react';

import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";


function App() {
  const [users, setUsers] = useState([]);

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
