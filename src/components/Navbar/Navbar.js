import './navbar.css'
;import React from 'react'

const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <div className="ui secondary menu">
            <a href='/' className="active item">
                Home
            </a>
            <a href='/' className="item">
                Messages
            </a>
            <a href='/' className="item">
                Friends
            </a>
            <div className="right menu">
                <a href='/' className="ui item">
                Logout
                </a>
            </div>
        </div>
    </div>
  );
}

export default Navbar;