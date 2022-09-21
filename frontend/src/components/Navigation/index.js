import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import * as sessionActions from '../../store/session';


function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history=useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const cart = useSelector(state=>state.cart);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };




  const setDemo = (e) => {
    e.preventDefault();

    const payload={
      credential: "Demo-lition", 
      password: "password"
    }
    return dispatch(sessionActions.login(payload))
      // .catch(async (res) => {
      //   await res.json();
      // });
  }

  return (
    <ul id="nav-bar-holder">
      <div id="nav-bar-logo-holder">
        <img src="https://i.imgur.com/gaHlmns.png" id="nav-bar-logo" onClick={e=>{
          e.preventDefault();
          history.push('/');
        }}/>
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
          <Link exact to="/cart">
            {/* Cart{`(${Object.values(cart).length-1})`} */}
            <i class="fa-solid fa-cart-shopping"></i>
            {`   (${Object.values(cart).length-1})`}
          </Link>
        </li>
        {isLoaded && sessionUser &&
        <li>
          <Link exact to="/myorders">
            {/* My orders */}
            <i class="fa-solid fa-bag-shopping"></i>
          </Link>
        </li>
        }
        {isLoaded && sessionUser &&
        <li>
          <Link exact to="/mycollections">
            {/* My Collections */}
            <i class="fa-solid fa-heart"></i>
          </Link>
        </li>
        }
        {isLoaded && sessionUser &&
        <li>
          <div className="nav-top-right-adjust" id="log-out-nav" onClick={logout}>
            {/* Log Out */}
            <i class="fa-solid fa-right-from-bracket"></i>
          </div>
        </li>
        }
        {isLoaded && !sessionUser &&
          <li>
            <div className="nav-top-right-adjust"  id="try-demo" onClick={e => setDemo(e)}>
              Demo
            </div>
          </li>
        }
        {isLoaded && !sessionUser && 
        <li>
            <Link className="nav-top-right-adjust" to="/login">
              {/* Log In */}
              <i class="fa-solid fa-right-to-bracket"></i>
            </Link>
        </li>
        }
        {isLoaded && !sessionUser && 
        <li>
            <Link className="nav-top-right-adjust" to="/signup">
              {/* Sign Up */}
              <i class="fa-solid fa-user-plus"></i>
            </Link>
        </li>
        }
      </ul>
    </ul>
  );
}

export default Navigation;
