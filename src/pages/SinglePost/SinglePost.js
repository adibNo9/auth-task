import "./singlePost.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const [postDetail, setPostDetail] = useState({});
  const params = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${params.postId}`
      );

      const data = await response.json();
      setPostDetail(data);
    };
    getPost();
  }, [params.postId]);

  return <div className="information-container"></div>;
};

export default SinglePost;
