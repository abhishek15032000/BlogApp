import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = (req, res) => {
  // CHECK EXISTING USER

  const query = "SELECT * FROM users WHERE email= ? or username = ?";
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(409).json("User already exists");
    }

    // hash password using bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(query, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json("User registered successfully");
      }
    });
  });
};

export const login = (req, res) => {
  // CHECK USER

  const query = "SELECT * FROM users where username= ?";
  db.query(query, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("User Not Found! ");
    }

    // check password entered in login time

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password! ");
    }

    const token = jwt.sign({ id: data[0].id }, "jwtkey"); //set the token as a cookie , this will let us identify whether the current user which is logeed in can edit or delete this post or not by verifying the token for this post and current users id , if same then can modify , else cannot modify

    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json("User has been logged out.");
};
