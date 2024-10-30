// Home.jsx
import React from 'react';
import  Carousel from './carrusel';
import Members from './fundadores';
import HistorySection from './HistorySection';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div>
      

      <div>
      <HistorySection/>
      </div>

      <section id="mvv">
        <div className="mv-container"> {/* Añadir contenedor para las tarjetas */}
        <div className="Card" id="mission">
            <h2>Nuestra Misión</h2>
            <p>
                Preservar y promover la cultura gastronómica chilena ofreciendo platos tradicionales elaborados con ingredientes de la más alta calidad, brindando a sus clientes una experiencia culinaria única y auténtica.
            </p>
        </div>

        <div className="Card" id="vision">
            <h2>Nuestra Visión</h2>
            <p>
                Convertirse en un referente de la cocina chilena a nivel nacional e internacional, expandiendo su propuesta a través de una experiencia gastronómica que combina tradición, innovación y excelencia en el servicio.
            </p>
        </div>

        <div className="Card" id="values">
            <h2>Valores</h2>
            <ul>
                <li><span>Autenticidad:</span> Respetan y celebran las tradiciones culinarias de Chile</li>
                <li><span>Calidad:</span> Se comprometen a ofrecer productos frescos y de primera calidad.</li>
                <li><span>Servicio:</span> Valoran a sus clientes, ofreciéndoles un ambiente cálido y acogedor.</li>
                <li><span>Innovación:</span> Buscar siempre nuevas formas de sorprender a los clientes sin perder de vista sus raíces</li>
            </ul>
        </div>
    </div>
</section>


      <section id="specialties">
        <h2>Especialidades</h2>
        <Carousel/>
      </section>

  <section id="team">
      <h2>Fundadores</h2>
      <Members/>
  </section>
    </div>
  );
}

export default AboutUs;
