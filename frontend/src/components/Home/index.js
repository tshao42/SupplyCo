import React from 'react';
import { useHistory } from 'react-router-dom';
import "./home.css"



function HomePage(){

    const history = useHistory();
    return(
        <div>
            <div id='home-page-splash-block'>
                <div id="home-page-splash-slogan-container">
                    <h1 id="home-page-splash-slogan-main">Transpire the moment</h1>
                    <div id="home-page-splash-slogan-secondary">Find your next instant camera</div>
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
            </div>
        </div>
    )
}

export default HomePage;