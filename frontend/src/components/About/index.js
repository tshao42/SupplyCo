import React from 'react';
import "./about.css"

function About(){

    return(
        <div className="about-container">
            <div id="about-title">About NotionSupplyCo.</div>
            <div id="italicized-part">A minimalist shopping website, inspired by modern brand websites</div>
            <div>Frontend: React, Redux, CSS</div>
            <div>Backend: SequelizeJs, Express</div>
            <div>Logo {`&`} favicon designed exclusively using Adobe Express</div>
            <div>All assets on this website come from the Internet</div>
            <div>Icons and fonts are used under respective user agreements</div>
            <div>Github Repo: {`  `}
                <a href="https://github.com/tshao42/SupplyCo">SupplyCo</a>
            </div>
            <div>My LinkedIn: {`  `}
                <a href="https://www.linkedin.com/in/tianyishao42/">Tianyi Shao's LinkedIn</a>
            </div>
        </div>
    )
}

export default About;