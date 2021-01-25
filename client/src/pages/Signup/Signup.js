/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import openModal from "../../actions/openModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showAlert } from "../../js/alerts";
import axios from "axios";

function Signup(props) {
  const [values, setValues] = useState({
    name: "Denny",
    email: "Dfeng415@yahoo.com",
    password: "123456aA!",
  });
  const { name, email, password } = values;

  // higher order function: function that calls another function
  const handleChanges = (name) => (event) => {
    // grab different values based on their name located in  values
    // combining/including all elements from an object/array to setValues using spread values (...values)
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/v1/auth/signup`;
    const data = { name, email, password };

    // post request from the backend
    await axios
      .post(url, data)
      .then((res) => {
        console.log("SIGN UP SUCCESSFULLY", res.data);
        console.log(res.data.message);
        // clean up the state
        setValues({
          name: "",
          email: "",
          password: "",
        });

        // show success alert
        if (res.data.status === "success") {
          showAlert("success", res.data.message);
        }
      })
      .catch((err) => {
        console.log("SIGN UP ERROR,", err.response.data.message);
        showAlert("error", err.response.data.message);
      });
  };

  return (
    <form>
      <div className='form-group flex-direction-column '>
        <label
          htmlFor='name'
          className='label-name secondary-heading secondary-color md'
        >
          Full Name
        </label>
        <input
          id='name'
          type='text'
          className='form-input'
          name='name'
          onChange={handleChanges("name")}
          value={name}
        />
      </div>
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
      <div className='form-group flex-direction-column margin-top '>
        <label
          htmlFor='password'
          className='label-name secondary-heading secondary-color md'
        >
          Password
        </label>
        <input
          id='password'
          type='password'
          className='form-input'
          name='password'
          onChange={handleChanges("password")}
          value={password}
        />
      </div>
      <div className='form-group flex-direction-column margin-top '>
        <button
          className='btn-primary green-background md'
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </div>
      <div className='form-group flex-direction-column margin-top '>
        <p className='secondary-heading secondary-color sm'>
          By Signing Up, you agree to our{" "}
          <Link to='#' className='signup-agreement-links'>
            Terms
          </Link>
          , and{" "}
          <Link to='#' className='signup-agreement-links'>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className='form-group flex-direction-column margin-top '>
        <hr className='hr-line' />
        <div className='link-btn primary-background btn-primary md'>
          <Link
            to=''
            onClick={() => {
              props.openModal("open", <Login />);
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
    },
    dispatcher
  );
}

export default connect(null, mapDispatchToProps)(Signup);
