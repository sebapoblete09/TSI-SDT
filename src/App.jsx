// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AboutUs from './components/AboutUs';
import Menu from './components/Menu';
import ReservationPague from './Components/Reservation'
import MyReservations from './components/My-reserv';
import Contact from './components/Contact';
import Login from './components/Login';
import Navbar from './Components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<ReservationPague />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
