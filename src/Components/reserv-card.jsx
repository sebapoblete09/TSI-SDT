// Home.jsx
import React from 'react';
import { useState, useEffect,} from 'react';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase/firebase'; 
import '../styles/my-reserv.css';

function reservCard() {

  //constantes para ver  si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: '', correo: '', telefono: '' });

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
  return (
    <div>
      {isAuthenticated ? (

        <h1>Hola {usuario.nombre}</h1>

      ): (

        <h1>Por favor inicia sesion</h1>
      )}
    </div>
    
  );
}

export default reservCard;
