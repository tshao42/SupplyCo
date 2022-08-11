import React from 'react';
import { Link } from 'react-router-dom';
import "./notfound.css"


function NotFound(){
    return(
        <div id="not-found-banner">
            <div id="not-found-text-msg">
                <h1>You've reached a page you shouldn't reach...Or it simply doesn't exist</h1>
                <div>{`we believe this is the case`}</div>
                <br />
                <br />
                <Link to="/" id="redirect-link">Let's go back home, shall we...?</Link>
            </div>
        </div>
    )
}

export default NotFound;