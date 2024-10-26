// Home.jsx
import React from 'react';
import { useState } from 'react';
import horas from '../const/horas';
import '../styles/reserv.css';

function Reservation() {


  const [reserva, setReserva] = useState(true);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const mesas = [1,2,3,4,5,6];
  
  const handleElegirMesa = ()=>{
    setReserva(false);//al hacer click muestra las mesas
  };

  const handleReserva = ()=>{
    setReserva(true);//al hacer click muestra las mesas
  };

  const handleSeleccionarMesa = (mesa)=>{
    setMesaSeleccionada(mesa);//establece la mesa seleccionada

  }

 
  return (
    <div className='reservation'>
      {reserva ? (
        <>
          <form>
          <h1>¡Reserva ahora!</h1>
          <p>Nombre: </p>
          <p>correo: </p>
          <p>Telefono: </p>

          <label htmlFor="grupo">Tamaño del grupo:</label>
          <select name="grupo" id="grupo" required>
            <option value="" disabled selected>Seleccione el tamaño del grupo</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6">6 personas</option>
          </select>

          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id='fecha' name='fecha' required/>

          <label htmlFor="horario">Horario:</label>
          <select name="horario" id="horario" required>
            {horas.map(horario =>(
              <option key={horario.value} value={horario.label}>
                {horario.label}
              </option>
            ))}
          </select>

          <button type='button' id='elegir-mesa' onClick={handleElegirMesa}>Elegir Mesa.</button>

          </form>
        
        </>
      ) : (

        <>
        <div id='mesa-container'>
          <h3>Eligue una mesa</h3>
          <div id='mesas'>
            {mesas.map(mesa=>(
              <button key={mesa} id='mesa-btn' onClick={()=>handleSeleccionarMesa(mesa)}>
                {mesa}
              </button>
            ))}
          </div>
          {mesaSeleccionada && (
            <button id='confirmar-mesa'>
              confirmar Reservacion.
            </button>
          )}

          <button type='button' id='volver' onClick={handleReserva}>Volver atras.</button>
        </div>
        </>
      )}      
    </div>
  );
}

export default Reservation;
