import './navbar.css'
;import React from 'react'
import { Link } from 'react-router-dom';
import locationLogo from '../../assets/locationLogo.png';

const Navbar = ({ isUserLoggedIn, onLogout }) => {

  return (
    <div className="navbarContainer">
      <div className="ui secondary menu">
        <Link to="/" className="active item">
          <h1 className='ui header'><img src={locationLogo} alt='location-logo' />Location App</h1>
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