import React, { useState } from 'react';


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
                    <li><a href="#hero" className="active">Inicio</a></li>
                    <li><a href="/pages/About-us.html">Sobre Nosotros</a></li>
                    <li><a href="/pages/Menu.html">Menú</a></li>
                    <li><a href="/pages/Reserva.html">Reservar</a></li>
                    <li className="res2"><a href="/pages/reservas2.html">Ver mis reservas</a></li>
                    <li><a href="/pages/Contact.html">Contacto</a></li>
                    <li><a href="/pages/login.html">Iniciar sesión</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
