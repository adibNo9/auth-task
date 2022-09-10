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
  const [userHasNotAcc, setUserHasNotAcc] = useState(false);

  const addNewPostHandler = (post) => {
    setNewPost((prevPosts) => [post, ...prevPosts]);
  };

  const logOutHandler = () => {
    setIsUserLoggedIn(false);
  };

  const isUserHasAcc = (values) => {
    users.find((user) => {
      if (user.email === values.email) {
        console.log("you are our user, email is true");
        if (user.password === values.password) {
          console.log("password is true");
          setIsUserLoggedIn(true);
          return isUserLoggedIn;
        } else {
          console.log("password false");
        }
      } else {
        console.log("he is not user");

        setUserHasNotAcc(true);
        return false;
      }
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:3001/users");

      const data = await response.json();
      setUsers(data);
    };

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
              <Home posts={posts} />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Login
                onCheckUser={isUserHasAcc}
                showPopup={userHasNotAcc}
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
