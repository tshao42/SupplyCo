import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

function Footer(){
    return (
        <div className="footer-container">
            <Link to="/" id="footer-nav-link">Notion Supply Co.</Link>
            <div>A Minimalist Shopping Website</div>
            <div>By Tianyi Shao</div>
            <div id="footer-icon-container">
                <a href="https://github.com/tshao42/SupplyCo">
                    <i className="devicon-github-original" id="footer-icon-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/tianyishao42/">
                    <i className="devicon-linkedin-plain" id="footer-icon-linkedin"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer;