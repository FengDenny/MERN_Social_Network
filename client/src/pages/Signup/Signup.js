import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import openModal from "../../actions/openModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Signup(props) {
  return (
    <form>
      <div className='form-group flex-direction-column '>
        <label
          htmlFor='name'
          className='label-name secondary-heading secondary-color md'
        >
          Full Name
        </label>
        <input id='name' type='text' className='form-input' name='name' />
      </div>
      <div className='form-group flex-direction-column margin-top '>
        <label
          htmlFor='email'
          className='label-name secondary-heading secondary-color md'
        >
          Email
        </label>
        <input id='email' type='text' className='form-input' name='email' />
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
        />
      </div>
      <div className='form-group flex-direction-column margin-top '>
        <button className='btn-primary green-background md'>Sign up</button>
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
