import React from 'react';
// import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

// const baseUrl = process.env.PUBLIC_URL;

const Topbar = (props) => (
  <div className="Topbar">
    <div className="leftSide">left</div>
    <div className="middle">
      <h2>Homework Management System</h2>
    </div>
    <div className="rightSide">
      <Dropdown
        id="topbar-dropdown"
        show={props.data.showTopbar}
        onMouseEnter={props.handlers.showTopbarDropdown}
        onMouseLeave={props.handlers.hideTopbarDropdown}
      >
        <Dropdown.Toggle as="div">
          <div className="user-profile">
            <div
              className={
                'userProfileImg ' +
                // (this.props.user.profile_picture_url ? '' : 'd-none')
                (false ? '' : 'd-none')
              }
            >
              <img
                // src={this.props.user.profile_picture_url}
                src={require('../../../assets/topbar/cyclist.jpg').default}
                alt="Avatar"
              />
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="dropdown-divider" />
          <Dropdown.Item onClick={() => props.handlers.handleLogout()}>
            <i className="bx bx-power-off" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
);

export default Topbar;
