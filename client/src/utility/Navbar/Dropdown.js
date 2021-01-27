import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { isAuth, logout } from "../helper/helpers";

function Dropdown({ history }) {
  return (
    <div>
      {isAuth() && (
        <div className='dropdown'>
          <li className='nav-item'>
            <NavLink
              activeStyle={{
                borderBottom: "1px solid white ",
              }}
              exact
              to={`/user/${isAuth()._id}`}
            >
              {isAuth().name}
            </NavLink>
          </li>
          <div className='dropdown-content'>
            <li className='nav-item'>
              <Link to={`/user/profile-setting/${isAuth()._id}`}>
                Profile Setting
              </Link>
              <hr className='dropdown-hr' />
              <span
                className='span-link'
                onClick={() => {
                  logout(() => {
                    history.push("/");
                  });
                }}
              >
                Logout
              </span>
            </li>
          </div>
        </div>
      )}
    </div>
  );
}
export default withRouter(Dropdown);
