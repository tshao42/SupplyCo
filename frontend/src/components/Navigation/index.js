import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    );
  }

  return (
    <ul id="nav-bar-holder">
      <div id="nav-bar-logo-holder">
        Icon placeholder
      </div>
      <ul id="nav-bar-options">
        <li>
          <Link exact to="/">Home</Link>
        </li>
        <li>
          <Link exact to="/products">Products</Link>
        </li>
        <li>
          <Link exact to="/about">About Us</Link>
        </li>
      </ul>
      <ul id="nav-bar-top-right-account-options">
        <li>
          <Link exact to="/cart">Cart</Link>
        </li>
        <li>
          <Link exact to="/myorders">My orders</Link>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </ul>
  );
}

export default Navigation;
