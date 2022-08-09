import React from 'react';
import { useHistory } from 'react-router-dom';
import "./home.css"



function HomePage(){

    const history = useHistory();
    return(
        <div>
            <div id='home-page-splash-block'>
                <div id="home-page-splash-slogan-container">
                    <h1 id="home-page-splash-slogan-main">Instant Inspiration</h1>
                    <div id="home-page-splash-slogan-secondary">Now is forever</div>
                    <button onClick=
                        {e=>{
                        e.preventDefault();
                        history.push(`/products`)
                        }}
                        id="home-page-splash-shop-button"
                    >
                        Shop
                    </button>
                </div>
                <img src="https://i.imgur.com/f0j4cuY.jpg" alt="homepage-impression" id="homepage-image" />
            </div>
        </div>
    )
}

export default HomePage;