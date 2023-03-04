import React from "react";
import { Link } from "react-router-dom";
const PostLayout = ({ image, id, title, description }) => {
  console.log(image);
  return (
    <div className="post" key={id}>
      <div className="img">
        <img src={`../public/upload/image`} alt="" />     
      </div>
      <div className="content">
        <Link className="link" to={`/post/${id}`}>
          <h1>{title}</h1>
        </Link>
        <p>{description}</p>
        <button>Read More</button>
      </div>
    </div>
  );
};

export default PostLayout;
