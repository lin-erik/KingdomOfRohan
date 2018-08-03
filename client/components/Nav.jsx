import React from 'react';
import { Link } from 'react-router-dom';

var Nav = props => {
  if (props.loggedIn === true) {
    return (
      <div className="tabs">
        <ul>
          <span>
            <b
              style={
                props.theme === 'Light'
                  ? { display: 'inline', marginLeft: 'auto' }
                  : { display: 'none', marginLeft: 'auto' }
              }
            >
              Moodvie
            </b>

            <b
              style={
                props.theme === 'Dark'
                  ? { display: 'inline', marginLeft: 'auto' }
                  : { display: 'none', marginLeft: 'auto' }
              }
            >
              Lewdvie
            </b>
          </span>
          <Link to="/global">Mood Search</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/purchased">Purchased</Link>
          <Link onClick={props.handleLogout} to="/logout">
            Logout
          </Link>

          <a
            style={
              props.theme === 'Light'
                ? { display: 'inline', marginLeft: 'auto' }
                : { display: 'none', marginLeft: 'auto' }
            }
            onClick={props.handleTheme}
          >
            Dark
          </a>

          <a
            style={
              props.theme === 'Dark'
                ? { display: 'inline', marginLeft: 'auto' }
                : { display: 'none', marginLeft: 'auto' }
            }
            onClick={props.handleTheme}
          >
            Light
          </a>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="tabs">
        <ul>
          <span>
            <b>Moodvie</b>
          </span>
          <Link to="/global">Mood Search</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </ul>
      </div>
    );
  }
};

export default Nav;
