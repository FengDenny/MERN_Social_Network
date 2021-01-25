import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { isAuth, logout } from "../helper/helpers";

function Navbar({ history }) {
  return (
    <nav className='navbar primary-background  '>
      <div className='container '>
        <header className=' white-color'>
          <h1 className='nav-logo primary-heading  '>MSNwork.</h1>
        </header>
        <ul className='nav-links flex justify-end md'>
          {!isAuth() && (
            <Fragment>
              <li className='nav-item'>
                <NavLink
                  activeStyle={{
                    borderBottom: "1px solid #db4437 ",
                  }}
                  exact
                  to='/'
                >
                  Signup
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  activeStyle={{
                    borderBottom: "1px solid #db4437 ",
                  }}
                  exact
                  to='/'
                >
                  Login
                </NavLink>
              </li>
            </Fragment>
          )}
          {isAuth() && (
            <li className='nav-item'>
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
          )}
        </ul>
      </div>
    </nav>
  );
}
export default withRouter(Navbar);
