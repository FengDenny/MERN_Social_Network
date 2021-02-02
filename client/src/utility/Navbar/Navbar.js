import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

function Navbar() {
  return (
    <nav className='navbar primary-background  '>
      <div className='container '>
        <header className=' white-color'>
          <h1 className='nav-logo primary-heading  '>MSNwork.</h1>
        </header>
        <ul className='nav-links flex justify-end md'>
          <li className='padding-left'>
            <NavLink
              activeStyle={{
                borderBottom: "1px solid white ",
              }}
              exact
              to='/user'
            >
              The Community
            </NavLink>
          </li>
          <Dropdown />
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
