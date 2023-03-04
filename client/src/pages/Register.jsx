import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      // if registration successfull redirect to login pagec
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
          name="username"
        />
        <input
          required
          type="email"
          placeholder="email"
          onChange={handleChange}
          name="email"
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
