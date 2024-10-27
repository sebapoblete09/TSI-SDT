// Home.jsx
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase/firebase'; 
import horas from '../const/horas';
import '../styles/reserv.css';

function ReservationPague() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: '', correo: '', telefono: '' });
  const [reserva, setReserva] = useState(true);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const mesas = [1, 2, 3, 4, 5, 6];

  // Crear referencias para los elementos del formulario
  const grupoRef = useRef(null);
  const fechaRef = useRef(null);
  const horarioRef = useRef(null);

  useEffect(() => {
    const fetchUsuario = async (uid) => {
      try {
        const docRef = doc(db, 'clientes', uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        } else {
          console.log('No hay tal documento!');
        }
      } catch (error) {
        console.error("Error al obtener el usuario: ", error);
      }
    };
  
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    
    if (token && uid) {
      setIsAuthenticated(true);
      fetchUsuario(uid);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleElegirMesa = () => {
    setReserva(false); // al hacer click muestra las mesas
  };

  const handleReserva = () => {
    setReserva(true); // al hacer click muestra el formulario
  };

  const handleSeleccionarMesa = (mesa) => {
    setMesaSeleccionada(mesa); // establece la mesa seleccionada
  }

  // enviar reserva a la bd
  const handleConfrimationReserv = async () => {
    if (mesaSeleccionada) {
      try {
        

        // Crea un documento en la colección "reserva" en Firestore
        await addDoc(collection(db, "reserva"), {
          estado: "Confirmada",
          nombre: usuario.nombre, // Usa el nombre del usuario autenticado
          correo: usuario.correo, // Usa el correo del usuario autenticado
          telefono: usuario.telefono, // Usa el teléfono del usuario autenticado
          grupo: grupoRef.current.value, // Usar referencia
          fecha: fechaRef.current.value, // Usar referencia
          horario: horarioRef.current.value, // Usar referencia
          mesa: mesaSeleccionada, // Utiliza la mesa seleccionada
        });
        alert("Reservación confirmada con éxito!");
      } catch (error) {
        console.error("Error al confirmar la reservación: ", error);
        alert("Hubo un problema al confirmar la reservación.");
      }
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        // Si está autenticado, muestra el formulario de reserva
        <div className='reservation'>
          {reserva ? (
            <>
              <form>
                <h1>¡Reserva ahora!</h1>
                <p>Nombre: {usuario.nombre}</p>
                <p>Correo: {usuario.correo}</p>
                <p>Teléfono: {usuario.telefono}</p>

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
                <input type="date" id='fecha' name='fecha' required />

                <label htmlFor="horario">Horario:</label>
                <select name="horario" id="horario" required>
                  {horas.map(horario => (
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
                <h3>Elige una mesa</h3>
                <div id='mesas'>
                  {mesas.map(mesa => (
                    <button key={mesa} id='mesa-btn' onClick={() => handleSeleccionarMesa(mesa)}>
                      {mesa}
                    </button>
                  ))}
                </div>
                {mesaSeleccionada && (
                  <button id='confirmar-mesa' onClick={handleConfrimationReserv}>
                    Confirmar Reservación.
                  </button>
                )}

                <button type='button' id='volver' onClick={handleReserva}>Volver atrás.</button>
              </div>
            </>
          )}
        </div>
      ) : (
        // Si no está autenticado, muestra el mensaje de inicio de sesión
        <p>Por favor, inicia sesión para hacer una reserva.</p>
      )}
    </div>
  )
}

export default ReservationPague;
