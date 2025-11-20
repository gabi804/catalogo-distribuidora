import React, { useState, useEffect } from 'react';
import  {ProductCatalog}  from '../pages/ProductCatalog';
import { motion } from 'framer-motion';
//import { EditarPrecios } from './pages/EditarPrecios';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500); // 2.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container" style={{ minHeight: '100vh', backgroundColor: '#0f0f0f' }}>
      {showSplash ? <SplashScreen /> : <ProductCatalog />}
    </div>
  );
  
  

}


// 🌟 Splash Screen Component
const SplashScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a)',
      }}
    >
      <motion.img
        src="/catalogo-distribuidora/producto.img/logo.jpeg"
        alt="Logo Distribuidora Kati"
        initial={{ scale: 0 }}
        animate={{ scale: 1.1 }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 10,
          delay: 0.3,
        }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          boxShadow: '0 0 25px rgba(0,255,100,0.4)',
          marginBottom: '20px',
        }}
      />

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #00e676, #00c853, #00bfa5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
          fontFamily: "'Poppins', sans-serif",
          textShadow: '0 0 15px rgba(0,255,100,0.3)',
        }}
      >
        Distribuidora Kati
      </motion.h1>
    </motion.div>
  );
};