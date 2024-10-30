// Carousel.js
import React, { useState, useEffect } from 'react';
import asado from '../img/asado.jpg';
import huerto from '../img/huerto.png';
import vino from '../img/vino.jpg';
import '../styles/carousel.css';

const specialties = [
    { id: 1, image: asado, description: 'Somos expertos en realizar asados, contamos con los mejores cortes y chefs que llevan toda una vida realizando su trabajo blblbal' },
    { id: 2, image: huerto, description: 'Ofrecemos una gran variedad de vinos chilenos, tanto comerciales como de carácter artesanal, con el fin de expandir la gastronomía local' },
    { id: 3, image: vino, description: 'Nos encargamos de traer y ocupar los mejores ingredientes, todos frescos y traídos directamente de huertos' },
    
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambia la diapositiva automáticamente cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === specialties.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    // Funciones para navegar entre las diapositivas
    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? specialties.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === specialties.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className="carousel">
            <div className="carousel-slide">
                <img src={specialties[currentIndex].image} alt={`Especialidad ${currentIndex + 1}`} />
                <p>{specialties[currentIndex].description}</p>
            </div>
            <div className="carousel-nav">
                <button onClick={goToPrevious} className="carousel-button">←</button>
                <button onClick={goToNext} className="carousel-button">→</button>
            </div>
        </div>
    );
};

export default Carousel;
