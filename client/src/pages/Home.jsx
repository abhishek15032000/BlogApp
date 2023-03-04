import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostLayout from "./PostLayout";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  // console.log(location);
  const fetchPostData = async () => {
    try {
      const res = await axios.get(`/posts${category}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch posts whenever category changes
  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line
  }, [category]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  console.log(posts);
  return (
    <div className="Home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <PostLayout
               //C:\Users\defab\OneDrive\Desktop\Blog Website\client\public\upload
              image={post.img}
              id={post.id}
              title={post.title}
              description={getText(post.desc)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
