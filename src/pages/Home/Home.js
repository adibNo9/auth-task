import "./home.css";
import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Navbar/Skeleton/Skeleton";
import Post from "./Post/Post";

const Home = ({ posts }) => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <div className="welcome-desc">
          <h3>WELCOME TO YOUR APP</h3>
          <p>Do you want set your Location in application?</p>
        </div>

        <Link className="buttonStyle" to="/set-location">
          Set Your current location
        </Link>
      </div>
      <div className="posts-Container">
        {posts.length === 0 &&
          [1, 2, 3, 4, 5, 6].map((post) => <Skeleton key={post} />)}
        {posts &&
          posts.map((post) => <Post key={post.id.toString()} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
