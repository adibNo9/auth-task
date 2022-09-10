import "./app.css";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PageSkeleton from "./components/PageSkeleton/PageSkeleton";

const SinglePost = React.lazy(() => import("./pages/SinglePost/SinglePost"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const SetLocation = React.lazy(() => import("./pages/SetLocation/SetLocation"));

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showPopupLogin, setShowPopupLogin] = useState(false);
  const [userHasNotAcc, setUserHasNotAcc] = useState(null);

  const addNewPostHandler = (post) => {
    setNewPost((prevPosts) => [post, ...prevPosts]);
  };

  const logOutHandler = () => {
    setIsUserLoggedIn(false);
    window.localStorage.removeItem("isloggedIn");
  };

  const isUserHasAcc = (values) => {
    users.find((user) => {
      if (user.email === values.email) {
        console.log("you are our user, email is true");
        if (user.password === values.password) {
          setIsUserLoggedIn(true);
          setUserHasNotAcc(user.id);
          window.localStorage.setItem("isloggedIn", true);
          return user.id;
        } else {
          return null;
        }
      } else {
        console.log("he is not user");
        return null;
      }
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:3001/users");

      const data = await response.json();
      setUsers(data);
    };

    setIsUserLoggedIn(window.localStorage.getItem("isloggedIn"));

    getUsers();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:3001/posts");

      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, [newPost]);

  const hidePopupHandler = () => {
    setUserHasNotAcc(false);
  };

  return (
    <BrowserRouter>
      <Navbar isUserLoggedIn={isUserLoggedIn} onLogout={logOutHandler} />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Home posts={posts} isUserLoggedIn={isUserLoggedIn} />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Login
                onCheckUser={isUserHasAcc}
                showPopup={showPopupLogin}
                onHidePopUp={hidePopupHandler}
              />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Signup setUserSignup={setUsers} />
            </Suspense>
          }
        />
        <Route
          path="/set-location"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <SetLocation onAddNewPost={addNewPostHandler} />
            </Suspense>
          }
        />
        <Route
          path=":postId"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <SinglePost
                onAddNewPost={addNewPostHandler}
                isUserLoggedIn={isUserLoggedIn}
              />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
