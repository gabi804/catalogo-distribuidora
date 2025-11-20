// src/pages/ProductCatalog.tsx
// src/pages/ProductCatalog.tsx (VERSION CORREGIDA CON SUPABASE)

// src/pages/ProductCatalog.tsx

import React, { useState, useMemo, useContext } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';
import { useProducts } from '../hooks/useProducts'; // Carga de datos dinámica

// Las declaraciones de estilo animado (moveGradient) deben ir en index.css
const style = document.createElement('style');
style.innerHTML = `
@keyframes moveGradient {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}`;
document.head.appendChild(style);

export const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useContext(ThemeContext); 
  
  const { products, loading } = useProducts(); 

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredProducts = useMemo(() => {
    if (loading || !products) return []; 
    if (!searchTerm) return products;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.nombre.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, products, loading]);

  if (loading) {
      return (
          <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh', 
                    background: theme === 'dark' ? '#141414' : '#ffffff', 
                    transition: 'background 0.5s ease'
                }}
            >
                
                {/* 1. Ícono de Carga */}
                <div 
                    style={{
                        width: '50px',
                        height: '50px',
                        border: '5px solid #00c85355', // Anillo gris claro
                        borderTop: '5px solid #00e676', // Tapa vibrante
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '15px'
                    }}
                />

                {/* 2. Mensaje de Carga Estilizado */}
                <h2 style={{ 
                        color: theme === 'dark' ? '#00e676' : '#00796b', 
                        fontSize: '1.5rem', 
                        fontWeight: 600 
                    }}>
                    Cargando Catálogo...
                </h2>
          </div>
      );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        transition: 'background 0.5s ease, color 0.5s ease',
        background:
          theme === 'dark'
            ? 'linear-gradient(180deg, #141414 0%, #1f1f1f 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
        color: theme === 'dark' ? '#f5f5f5' : '#222',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Header onSearch={handleSearch} />

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '30px',
            background: 'linear-gradient(90deg, #00e676, #00bfa5, #00e676)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'moveGradient 6s linear infinite',
          }}
        >
          🛒 Catálogo de Productos
        </h2>

        <ProductGrid products={filteredProducts} />
      </main>

      <Footer />
    </div>
  );
};





