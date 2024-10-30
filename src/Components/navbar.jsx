import React, { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const Navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token'); // Elimina el token de localStorage
        localStorage.removeItem('uid'); // Elimina el token de localStorage
        setIsAuthenticated(false); 
        Navigate('/home');
        window.location.reload();         // Actualiza el estado de autenticación
    };
    
    useEffect(() => {
        // Función para verificar si hay un token en localStorage
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
            
        };

        // Verifica el estado de autenticación al montar el componente
        checkAuthStatus();

        // Listener para detectar cambios en localStorage
        window.addEventListener('storage', checkAuthStatus);

        // Limpia el listener al desmontar el componente
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    return (

        <div style={{ marginBottom: '100px' }}>
            {isAuthenticated ? (
                // Si está autenticado, muestra el siguiente navbar
                <header>
                    <div className="bars" onClick={toggleNavbar}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    </div>
                    <div className={`nav-bar ${isActive ? 'active' : ''}`}>
                        <ul>
                            <li><NavLink to="/home" activeClassName="active">Inicio</NavLink></li>
                            <li><NavLink  to="/about-us" activeClassName="active">Sobre Nosotros</NavLink></li>
                            <li><NavLink  to="/menu" activeClassName="active">Menú</NavLink></li>
                            <li><NavLink to="/reservation" activeClassName="active">Reservar</NavLink></li>
                            <li><NavLink  to="/my-reservations" activeClassName="active">Ver mis reservas</NavLink></li>
                            <li><NavLink  to="/contact" activeClassName="active">Contacto</NavLink></li>
                            <li><button onClick={logout}>Cerrar Sesión</button></li>
                        </ul>
                    </div>
                </header>
            ) : (
                // Si no está autenticado, muestra el siguiente navbar
                <header>
                    <div className="bars" onClick={toggleNavbar}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    </div>
                    <div className={`nav-bar ${isActive ? 'active' : ''}`}>
                        <ul>
                            <li><NavLink to="/home" activeClassName="active">Inicio</NavLink></li>
                            <li><NavLink  to="/about-us" activeClassName="active">Sobre Nosotros</NavLink></li>
                            <li><NavLink  to="/menu" activeClassName="active">Menú</NavLink></li>
                            <li><NavLink to="/reservation" activeClassName="active">Reservar</NavLink></li>
                            <li><NavLink  to="/my-reservations" activeClassName="active">Ver mis reservas</NavLink></li>
                            <li><NavLink  to="/contact" activeClassName="active">Contacto</NavLink></li>
                            <li><NavLink to="/login" activeClassName="active">Iniciar sesión</NavLink></li>
                        </ul>
                    </div>
                </header>

            )};
        </div>
    );
};

export default Navbar;