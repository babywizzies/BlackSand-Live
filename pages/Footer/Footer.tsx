import React, { useState } from 'react'

export default function Footer()  {
    /*window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        if(this.scrollY >= 80) header.classList.add ("scroll-header");
        else header.classList.remove("scroll-header");
    })*/

    const[activeNav, setActiveNav] = useState("home");
  return (
    <footer className="footer">
        <div className="footer__container container">
            <h1 className="footer__title">Heroes Of Cumberland</h1>


            <div className="footer__social">
                <a href="https://discord.gg/bSBKvsQqJD" className="footer__social-link" rel="noreferrer" target="_blank">
                <i className="bx bxl-discord"></i>
                </a>

                <a href="https://twitter.com/HeroesOfCumber" className="footer__social-link" rel="noreferrer" target="_blank">
                <i className="bx bxl-twitter"></i>
                </a>

                <a href="https://opensea.io/collection/heroesofcumberland" className="footer__social-link" rel="noreferrer" target="_blank">
                <i className="bx bxs-store"></i>
                </a>
            </div>
            
            <span className="footer__copy">Artwork by <a href="https://twitter.com/fecklessmage" className="footer__name" rel="noreferrer" target="_blank">Feckless</a>.</span>
            <span className="footer__copy1">Special thanks to <a href="https://twitter.com/BiIIGains" className="footer__name" rel="noreferrer" target="_blank">Bill Ding</a>
            {" "} and <a href="https://twitter.com/pleasuresdotbnb" className="footer__name" rel="noreferrer" target="_blank">Pleasures</a>.
            </span>
        </div>
    </footer>
  )
}

