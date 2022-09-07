import './navbar.css'
;import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({ isUserLoggedIn, onLogout }) => {

  return (
    <div className="navbarContainer">
      <div className="ui secondary menu">
        <Link to="/" className="active item">
          Home
        </Link>
        <Link to="/message" className="item">
          Messages
        </Link>
        <Link to="/friends" className="item">
          Friends
        </Link>
        {isUserLoggedIn && (
          <div className="right menu">
            {' '}
            <Link onClick={() => onLogout()} to="/" className="ui item">
              Logout
            </Link>{' '}
          </div>
        )}
        {!isUserLoggedIn && (
          <div className="right menu ">
            <Link to="/login" className="ui item">
              Login
            </Link>
            <Link to="/signup" className="ui item">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;