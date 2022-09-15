import "./app.css";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PageSkeleton from "./components/PageSkeleton/PageSkeleton";
import ErrorModal from "./components/UI/ErrorModal";

const SinglePost = React.lazy(() => import("./pages/SinglePost/SinglePost"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const SetLocation = React.lazy(() => import("./pages/SetLocation/SetLocation"));

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    window.localStorage.getItem("isloggedIn")
  );
  const [showPopup, setShowPopup] = useState(false);

  const addNewPostHandler = (post) => {
    setNewPost((prevPosts) => [post, ...prevPosts]);
  };

  const askForLogout = () => {
    setShowPopup(true);
  };

  const logOutHandler = () => {
    setIsUserLoggedIn(false);
    window.localStorage.removeItem("isloggedIn");
    setShowPopup(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:3000/posts");

      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, [newPost]);

  return (
    <BrowserRouter>
      <Navbar isUserLoggedIn={isUserLoggedIn} onLogout={askForLogout} />
      {showPopup && (
        <ErrorModal
          actionButton="Logout"
          cancleButton="Cancle"
          onDeletePost={logOutHandler}
          onCancleDelete={() => setShowPopup(false)}
          title="Logout"
          message="Are you sure for logout?"
        />
      )}
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
              <Login setIsUserLoggedIn={setIsUserLoggedIn} />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Signup />
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
