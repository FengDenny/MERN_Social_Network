/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UsersHome() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    const url = "/api/v1/users/get-users";
    await axios.get(url).then((response) => {
      console.log("Users", response.data);
      const { users } = response.data;
      setUserData({ ...userData, users });
    });
  };

  const { users } = userData;
  return (
    <div className='container'>
      <h1>Users</h1>
      <div className='wrapper margin-top-30'>
        {/* to remove error of map undefined must include users && users.map */}
        {users &&
          users.map((user, i) => (
            <div key={i} className='user-card'>
              <img
                src='https://res.cloudinary.com/dis7ep3yq/image/upload/v1607809957/1024px-No_image_available.svg_p8eu6x.png'
                alt='profile'
              />
              <h1 className='primary-color primary-heading '>{user.name}</h1>
              <p className='secondary-color secondary-heading margin-top-sm'>
                {user.email}
              </p>
              <Link
                className='primary-color user-card-profile-link'
                to={`/user/${user._id}`}
              >
                View Profile
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
export default UsersHome;
