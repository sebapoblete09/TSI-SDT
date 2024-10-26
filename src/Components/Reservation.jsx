// Home.jsx
import React from 'react';
import horas from '../const/horas';

function Reservation() {
  return (
    <div>
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
        


      </form>
    </div>
  );
}

export default Reservation;
