import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

import Image from 'next/image'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="nav__container">
    <div className="Navbar">
        <Link href="/"><span className="nav__logo">Heroes Of Cumberland</span></Link>
        <div className={`nav__items ${isOpen && "open"}`}>
            <Link href="/"><a>Home</a></Link>
            <Link href="../games/games.html"><a target="_blank">Games</a></Link>
            <a><ConnectButton/></a>
            
        </div>
        <div className={`nav__toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
            
        </div>
    </div>
    </div>
  )
}

export default Header