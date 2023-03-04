import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
const Write = () => {
  // if we click on edit a post all the details of the post should be filled like title,description,category all should be set when we are editing a post which has already been created , in case of new post all the values of the form will be empty .
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null); // upload image
  const [cat, setCat] = useState(state?.category || "");

  const imgUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await imgUpload();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visiblity: </b> Public
          </span>
          <input
            type="file"
            name=""
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          <label htmlFor="file" className="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>

          <div className="category">
            <input
              type="radio"
              name="category"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "art"}
            ></input>
            <label htmlFor="art">Art</label>
          </div>

          <div className="category">
            <input
              type="radio"
              name="category"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "science"}
            ></input>
            <label htmlFor="science">Science</label>
          </div>

          <div className="category">
            <input
              type="radio"
              name="category"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "technology"}
            ></input>
            <label htmlFor="technology">Technology</label>
          </div>

          <div className="category">
            <input
              type="radio"
              name="category"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "cinema"}
            ></input>
            <label htmlFor="cinema">Cinema</label>
          </div>

          <div className="category">
            <input
              type="radio"
              name="category"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "design"}
            ></input>
            <label htmlFor="design">Design</label>
          </div>

          <div className="category">
            <input
              type="radio"
              name="category"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "food"}
            ></input>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
