import './home.css'
import React  from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className='home-container'>
      <Link className='button-location' to="/set-location">
        <button className="ui button">Set Your current location</button>
      </Link>
    </div>
  );
}

export default Home;