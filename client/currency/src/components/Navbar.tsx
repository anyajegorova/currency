import React from 'react'
import './styles/Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-item">Rates</NavLink>
            <NavLink to="/converter" className="nav-item">Converter</NavLink>
        </nav>
    )
}

export {Navbar}
