import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showLoginAlert } from "../../js/alerts";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleChanges = (name) => (event) => {
    // grab different values based on their name located in  values
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "/api/v1/auth/signin";
    const data = { email, password };

    axios
      .post(url, data)
      .then((res) => {
        console.log("SIGN IN SUCCESSFULLY", res);
        if (res.data.status === "success") {
          showLoginAlert("success", `Hey ${res.data.user.name}, Welcome back!`);
        }
      })
      .catch((err) => {
        console.log("SIGN UP ERROR", err);
        showLoginAlert("error", err.response.data.message);
      });
  };

  return (
    <form className='form'>
      <h1 className='primary-color flex justify-center '>Welcome back.</h1>
      <div className='form-group flex-direction-column margin-top '>
        <label
          htmlFor='email'
          className='label-name secondary-heading secondary-color md'
        >
          Email
        </label>
        <input
          id='email'
          type='text'
          className='form-input'
          name='email'
          onChange={handleChanges("email")}
          value={email}
        />
      </div>
      <div className='form-group flex-direction-column margin-top-30 '>
        <label
          htmlFor='password'
          className='label-name secondary-heading secondary-color md'
        >
          Password
        </label>
        <Link className='password-recovery' to=''>
          Forgot your password?
        </Link>
        <input
          id='password'
          type='password'
          className='form-input'
          name='password'
          onChange={handleChanges("password")}
          value={password}
        />
      </div>
      <div className='form-group flex-direction-column margin-top-30 '>
        <button
          className='link-btn primary-background btn-primary md'
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
