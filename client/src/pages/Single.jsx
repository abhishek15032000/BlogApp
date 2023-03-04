import React, { useEffect, useState, useContext } from "react";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // extracting out the id of the post which we want to get
  // in order to hit the api with the /posts/:id
  const postId = location.pathname.split("/")[2]; // since the website we are accessing is localhost:8000/posts/1 - so 1 will be at 2nd index
  const fetchPostData = async () => {
    try {
      const res = await axios.get(`/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch posts whenever we view a new post we are viewing,since evey post has a postid associated to it , so whenver postId changes we re render the component based on the data fetched from the mySql
  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line
  }, [postId]);

  // we can edit or delete this post if the posts belong to the current user

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../public/upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="person" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="edit post"></img>
              </Link>
              <img src={Delete} alt="delete post" onClick={handleDelete}></img>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <Menu category={post.category} />
    </div>
  );
};

export default Single;
