/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { showAlert } from "../../js/alerts";
import axios from "axios";
import jwt from "jsonwebtoken";

function AccountActivation({ match }) {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  const history = useHistory();

  useEffect(() => {
    // App.js path='/auth/activate/:token'
    const token = match.params.token;
    // grab the users name from the registered token data
    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/v1/auth/account-activation";
    const data = { token };
    // post request from backend
    await axios
      .post(url, data)
      .then((res) => {
        console.log("ACCOUNT ACTIVATED", res.data);
        setValues({ ...values, show: false });
        if (res.data.status === "success") {
          showAlert("success", res.data.message);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("ACCOUNT ACTIVATED ERROR", err.response.data.message);
        showAlert("error", err.response.data.message);
        history.push("/");
      });
  };

  return (
    <div className='account-activate'>
      <div className='form-group flex flex-direction-column md '>
        <h1 className='primary-heading primary-color'>
          Hello, {name}! Please activate your account to get started!
        </h1>
        <button
          className='btn-primary green-background md margin-top-30'
          onClick={handleSubmit}
        >
          Activate Account
        </button>
      </div>
    </div>
  );
}

export default AccountActivation;
