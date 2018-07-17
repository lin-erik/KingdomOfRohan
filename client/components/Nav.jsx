import React from 'react';
import { Link } from 'react-router-dom';


var Nav = () => {
  return (
    <div className="tabs">
      <ul>
        <span><b>Moodvie</b></span>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/global">Mood Search</Link>
      </ul>
    </div>
  );
};

export default Nav;
