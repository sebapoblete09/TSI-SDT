// Home.jsx
import React from 'react';
import  Carousel from './carrusel';
import Members from './fundadores';
import HistorySection from './HistorySection';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className='AboutUs'>
      
      <div className='History'>
        <HistorySection/>
      </div>

      <div>
        <Carousel/>
      </div>

      <div>
        <Members/>
      </div>


    </div>
    
  );
}

export default AboutUs;
