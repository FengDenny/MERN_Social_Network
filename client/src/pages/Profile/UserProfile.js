/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../utility/helper/helpers";
import { withRouter } from "react-router-dom";
import axios from "axios";
function UserProfile({ match, history }) {
  const [data, setData] = useState({
    created: "",
  });
  const token = getCookie("token");
  //   userId from App.js: /user/:userId
  const id = match.params.userId;

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    await axios({
      method: "GET",
      url: `/api/v1/users/get-user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE", response.data);
        const { created } = response.data;
        setData({ ...data, created });
      })
      .catch((error) => {
        if (error) {
          history.push("/");
        }
      });
  };

  const { created } = data;
  return (
    <div className='container'>
      <div className='margin-top secondary-color   '>
        <h1 className='primary-color '>User's Profile</h1>
        <p className='margin-top md '>Welcome, {isAuth().name} </p>
        <p className='md '>Email: {isAuth().email}</p>
        <p className='md  '>{`Joined: ${new Date(created).toDateString()}`}</p>
        {isAuth() && isAuth()._id === id && (
          <div className='inline-block margin-top'>
            <button className='danger-background white-color btn-primary width-md md '>
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default withRouter(UserProfile);
