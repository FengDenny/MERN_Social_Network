/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../utility/helper/helpers";
import { withRouter } from "react-router-dom";
import DeleteUserProfile from "./DeleteUserProfile";
import axios from "axios";
function UserProfile({ match, history }) {
  const [data, setData] = useState({
    created: "",
    name: "",
    emial: "",
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
        const { created, name, email } = response.data;
        setData({ ...data, created, name, email });
      })
      .catch((error) => {
        if (error) {
          history.push("/");
        }
      });
  };

  const { created, name, email } = data;
  return (
    <div className='container'>
      <div className='margin-top secondary-color '>
        <h1 className='primary-color flex flex-direction-column '>
          User's Profile
        </h1>

        <div className='user-profile-img margin-top-30'>
          <img
            src='https://res.cloudinary.com/dis7ep3yq/image/upload/v1607809957/1024px-No_image_available.svg_p8eu6x.png'
            alt='profile'
          />
        </div>

        <div className=' user-profile-info'>
          <p className='margin-top l '>Name: {name} </p>
          <p className='l '>Email: {email}</p>
          <p className='l  '>{`Joined: ${new Date(created).toDateString()}`}</p>
          {isAuth() && isAuth()._id === id && <DeleteUserProfile />}
        </div>
      </div>
    </div>
  );
}
export default withRouter(UserProfile);
