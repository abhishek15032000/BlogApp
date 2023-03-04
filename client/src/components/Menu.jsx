import React, { useState, useEffect } from "react";
import axios from "axios";

const Menu = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/?category=${category}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <img src={`../upload/${post?.img}`} alt=""></img>
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
