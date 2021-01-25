/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { showLoginAlert } from "../../js/alerts";
import { authenticate, isAuth } from "../../utility/helper/helpers";
import axios from "axios";

function Login({ history }) {
  const [values, setValues] = useState({
    email: "dfeng415@yahoo.com",
    password: "123456aA!",
    redirectToReferer: false,
  });

  // close modal
  const reload = () => {
    window.location.reload();
  };

  const { email, password } = values;

  const handleChanges = (name) => (event) => {
    // grab different values based on their name located in  values
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/v1/auth/signin";
    const data = { email, password };
    // post request from backend
    await axios
      .post(url, data)
      .then((res) => {
        console.log("LOG IN SUCCESSFULLY", res);
        authenticate(res, () => {
          // clean state
          setValues({
            ...values,
            email: "",
            password: "",
          });
          // if (res.data.status === "success") {
          //   reload();
          // }
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/subscriber");
        });
      })

      .catch((err) => {
        console.log("LOG IN ERROR", err);
        showLoginAlert("error", err.response.data.message);
      });
  };

  const LoginForm = () => {
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
  };

  return (
    <div>
      {/* check if user is signed in  */}
      {isAuth() && isAuth().role === "admin" ? (
        <Redirect to='/admin' />
      ) : isAuth() && isAuth().role === "subscriber" ? (
        <Redirect to='/subscriber' />
      ) : null}

      {LoginForm()}
    </div>
  );
}

export default withRouter(Login);
