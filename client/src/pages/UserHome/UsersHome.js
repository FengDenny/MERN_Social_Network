/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
      <div>
        {users &&
          users.map((user, i) => (
            <div key={i} className='user-card'>
              <p>{user.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
export default UsersHome;
