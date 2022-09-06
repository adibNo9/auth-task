import './navbar.css'
;import React from 'react'

const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <div class="ui secondary menu">
            <a href='/' class="active item">
                Home
            </a>
            <a href='/' class="item">
                Messages
            </a>
            <a href='/' class="item">
                Friends
            </a>
            <div class="right menu">
                <a href='/' class="ui item">
                Logout
                </a>
            </div>
        </div>
    </div>
  );
}

export default Navbar;