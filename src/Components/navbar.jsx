import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    return (
        <header>
            <div className="bars" onClick={toggleNavbar}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className={`nav-bar ${isActive ? 'active' : ''}`}>
                <ul>
                    <li><NavLink to="/" activeClassName="active">Inicio</NavLink></li>
                    <li><NavLink  to="/about-us" activeClassName="active">Sobre Nosotros</NavLink></li>
                    <li><NavLink  to="/menu" activeClassName="active">Menú</NavLink></li>
                    <li><NavLink to="/reservation" activeClassName="active">Reservar</NavLink></li>
                    <li><NavLink  to="/my-reservations" activeClassName="active">Ver mis reservas</NavLink></li>
                    <li><NavLink  to="/contact" activeClassName="active">Contacto</NavLink></li>
                    <li><NavLink  to="/login" activeClassName="active">Iniciar sesión</NavLink></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
