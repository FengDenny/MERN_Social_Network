/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  isAuth,
  getCookie,
  logout,
  updateUser,
} from "../../utility/helper/helpers";
import { showAlert } from "../../js/alerts";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Profile({ history }) {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = () => {
    axios({
      method: "GET",
      url: `/api/v1/users/get-user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response.data);
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error);
        if (error.response.status === 401) {
          logout(() => {
            history.push("/");
          });
        }
      });
  };

  const { name, email, password, role } = values;

  const handleChanges = (name) => (event) => {
    // grab different values based on their name located in  values
    setValues({ ...values, [name]: event.target.value });
  };
  // const handleSubmit = async (event) => {
  //   // stop the page from reloading
  //   event.preventDefault();
  //   // get request from backend
  //   await axios({
  //     method: "PUT",
  //     url: `/api/v1/users/update-user/${isAuth()._id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: { name, password },
  //   })
  //     .then((res) => {
  //       console.log("PROFILE UPDATED SUCCESSFULLY", res);
  //       console.log(res.data.message);
  //       updateUser(res, () => {
  //         // toast.success(res.data.message);
  //         if (res.data.status === "success") {
  //           showAlert("success", res.data.message);
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("PROFILE UPDATED ERROR", err.response.data.message);
  //       showAlert("error", err.response.data.message);
  //     });
  // };

  const handleSubmit = async (event) => {
    // stop the page from reloading
    event.preventDefault();
    // get request from backend
    await axios({
      method: "PUT",
      url: `/api/v1/users/update-user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password: password || undefined },
    })
      .then((res) => {
        console.log("PROFILE UPDATED SUCCESSFULLY", res);
        console.log(res.data.message);

        updateUser(res, () => {
          if (res.data.status === "success") {
            showAlert("success", res.data.message);
          }
        });
      })
      .catch((err) => {
        console.log("PROFILE UPDATEDERROR", err.response.data.message);
        showAlert("error", err.response.data.message);
      });
  };

  const UpdateForm = () => {
    return (
      <form className='form flex flex-direction-column'>
        <h1 className='primary-color flex justify-center '>Update Profile</h1>
        <div className='form-group flex-direction-column margin-top '>
          <label
            htmlFor='role'
            className='label-name secondary-heading secondary-color md'
          >
            Role
          </label>
          <input
            id='role'
            type='text'
            className='form-input'
            name='role'
            onChange={handleChanges("role")}
            defaultValue={role}
            disabled
          />
        </div>
        <div className='form-group flex-direction-column margin-top-30 '>
          <label
            htmlFor='name'
            className='label-name secondary-heading secondary-color md'
          >
            Name
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
        <div className='form-group flex-direction-column margin-top-30 '>
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
            disabled
          />
        </div>
        <div className='form-group flex-direction-column margin-top-30 '>
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

        <div className='form-group flex-direction-column margin-top-30 '>
          <button
            className='link-btn primary-background btn-primary md'
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </form>
    );
  };

  return <div>{UpdateForm()}</div>;
}
export default withRouter(Profile);
