import React from 'react';
// import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const baseUrl = process.env.PUBLIC_URL;

const NavbarMenu = (props) => (
  <div className="Navbar">
    <div
      className="flex-container"
      id={props.data.showMobileNav ? 'hidden' : ''}
    >
      <NavLink
        exact
        className="navItem"
        activeClassName="navItemActive"
        to={`${baseUrl}/dashboard`}
      >
        <i className="bx bx-chalkboard" />
        <span>Dashboard</span>
      </NavLink>
    </div>
  </div>
);

export default NavbarMenu;
