import { db } from "../db.js";
import jwt from "jsonwebtoken";
export const addPost = (req, res) => {
  // check if user is already logged in or not to make a post addition
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not Authenticated");
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }

    const query =
      "INSERT INTO posts(`title`,`desc`,`img`,`category`,`date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(query, [values], (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        return res.json("Post has been created.");
      }
    });
  });
};

export const getPosts = (req, res) => {
  const query = req.query.category
    ? "SELECT * FROM posts where category =? "
    : "SELECT * FROM posts";

  db.query(query, [req.query.category], (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  // since we are only getting post id we need to know the user who posted this blog , since every post has a  id posted with it through which we can navigate in the users table to fetch the username with this id, for this we would be "joining" the two tables posts and users based on the id that is received from the website query
  // we want posts image , as img field exist on both of the tables so use p.img
  const query =
    "SELECT p.id, `username`,`title`,`desc`,p.img,u.img AS userImg,`category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id=?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(data[0]);
    }
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not Authenticated");
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    } else {
      const postId = req.params.id;
      const query = "DELETE FROM posts where `id` = ? AND `uid` =?";
      db.query(query, [postId, userInfo.id], (err, data) => {
        if (err) {
          return res.status(403).json("You can delete only your post!");
        } else {
          return res.json("Post has been deleted!");
        }
      });
    }
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not Authenticated");
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }
    const postId = req.params.id;
    const query =
      "UPDATE posts SET `title`=? , `desc`=? , `img`=? ,`category`=? WHERE `id`=? AND `uid`=? ";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(query, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        return res.json("Post has been updated.");
      }
    });
  });
};
