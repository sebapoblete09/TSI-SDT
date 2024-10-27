// Login.jsx
import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase/firebase'; 
import '../styles/login.css';

function Login() {

  const [isLoginVisible, setIsLoginVisible] = useState(true); // Estado para controlar la visibilidad
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, settelefono] = useState('');
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  

  const handleRegisterClick = () => {
    setIsLoginVisible(false); // Mostrar el formulario de registro
  };

  const handleBackToLoginClick = () => {
    setIsLoginVisible(true); // Mostrar el formulario de inicio de sesión
  };

  //logica login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);

      // Obtiene el usuario
      const user = userCredential.user;
      // Obtiene el UID del usuario
      const uid = user.uid;
      // Obtiene el token de acceso
      const token = await user.getIdToken();

      // Guarda el token en localStorage o sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('uid', uid);
      console.log("Token guardado en localStorage:", token);
      console.log("Inicio de sesión exitoso");
      alert("Inicio de sesion Exitoso"); // Mensaje de éxito
      window.location.reload();  
      
      // Aquí puedes redirigir al usuario a otra página
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };


  //logica registro
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
      // Aquí guardamos la información adicional en Firestore
      const userRef = doc(db, 'clientes', userCredential.user.uid); // Crea una referencia a un documento en Firestore usando el UID del usuario
      await setDoc(userRef, {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      telefono: telefono,
    });
      console.log("Registro exitoso:", userCredential.user);
      alert("Registro exitoso! Bienvenido, " + nombre); // Mensaje de éxito
      setNombre('');
      setApellido('');
      settelefono('');
      setCorreo('');
      setContraseña('');
    } catch (error) {
      console.error("Error al registrarse:", error.message);
      alert(`Error al registrarse: ${error.message}`); // Muestra un mensaje al usuario
    }
  };

  //inicio de sesion con google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      
      const result = await signInWithPopup(auth, provider);

      // Obtiene el usuario
      const user = result.user;
      // Obtiene el UID del usuario
      const uid = user.uid;
      // Obtiene el token de acceso
      const token = await user.getIdToken();
    

      // Guarda el token en localStorage o sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('uid', uid);
      console.log("Token guardado en localStorage:", token);
      console.log("Inicio de sesión con Google exitoso:", result.user);
      alert("Inicio de sesion exitoso"); // Mensaje de éxito
      window.location.reload();  
      
      
      const userRef = doc(db, 'clientes', user.uid);

      // Verifica si el usuario ya tiene datos en Firestore
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        // Si no tiene datos, pide el número de teléfono
        setIsGoogleUser(true); // Muestra el formulario para ingresar el número de teléfono
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

   // Manejo del formulario para guardar información adicional
   const handleGoogleUserData = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const userRef = doc(db, 'clientes', user.uid);
      await setDoc(userRef, {
        nombre: user.displayName,  // Nombre del usuario de Google
        correo: user.email,        // Correo electrónico del usuario de Google
        telefono: telefono,
      }, { merge: true }); // Merge para no sobrescribir datos existentes
      console.log("Datos del usuario guardados exitosamente");
      setIsGoogleUser(false); // Cierra el formulario
      settelefono('');
    } catch (error) {
      console.error("Error al guardar los datos del usuario:", error.message);
    }
  };

  return (
    <div className='container-form'>
      {isLoginVisible ? (
        <>
          <h2>¡Bienvenido!</h2>
          <span>Inicia sesión para realizar una reserva</span>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo Electrónico" required />
            </div>
            <div className="form-group">
              <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Contraseña" required />
            </div>
            <div className="btns">
              <button type="submit" id="iniciar-sesion">Iniciar Sesión</button>
              <button type="button" id="registrarse" onClick={handleRegisterClick}>Registrarse</button>
              <button type="button" id="google-login" onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>¡Regístrate!</h2>
          <span>Crea una cuenta para realizar una reserva más fácil</span>
          <form onSubmit={handleRegister}>
            <label htmlFor="Nombre">Nombre</label>
            <input type="text" id="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />

            <label htmlFor="Apellido">Apellido</label>
            <input type="text" id="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" required />

            <label htmlFor="celular">Celular:</label>
            <input type="tel" id="celular" value={telefono} onChange={(e) => settelefono(e.target.value)} maxLength="9" required />

            <label htmlFor="Correo">Correo Electrónico</label>
            <input type="email" id="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="ejemplo@gmail.com" required />

            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} maxLength="9" required />

            <div className="btns">
              <button type="submit" id="crear-cuenta">Crear Cuenta</button>
              <button type="button" id="volver" onClick={handleBackToLoginClick}>Volver a inicio de sesión</button>
            </div>
          </form>
        </>
      )}

      {isGoogleUser && (
              <form onSubmit={handleGoogleUserData}>
                <h2>Ingresa tu número de teléfono</h2>
                <label htmlFor="celular">Celular:</label>
                <input type="tel" id="celular" value={telefono} onChange={(e) => settelefono(e.target.value)} maxLength="9" required />

                <div className="btns">
                  <button type="submit">Guardar Información</button>
                  <button type="button" onClick={() => setIsGoogleUser(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
  );
}

export default Login;
