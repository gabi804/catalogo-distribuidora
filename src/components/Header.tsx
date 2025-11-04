import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detecta cuando cambia el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowSearch(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(15, 30, 15, 0.9)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Logo + título */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img
          src="/catalogo-distribuidora/producto.img/logo.jpeg"
          alt="Logo"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 0 8px rgba(0,255,100,0.4)',
          }}
        />
        <h1
          style={{
            fontSize: '1.5rem',
            color: '#00e676',
            fontWeight: 600,
            letterSpacing: '1px',
            margin: 0,
          }}
        >
          Distribuidora Kati
        </h1>
      </div>

      {/* Buscador o botón 🔍 */}
      {isMobile ? (
        <>
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={{
              background: 'none',
              border: 'none',
              color: '#00e676',
              fontSize: '1.8rem',
              cursor: 'pointer',
            }}
          >
            🔍
          </button>
          {showSearch && (
            <div
              style={{
                width: '100%',
                marginTop: '10px',
              }}
            >
              <SearchBar onSearch={onSearch} />
            </div>
          )}
        </>
      ) : (
        <div style={{ width: '300px' }}>
          <SearchBar onSearch={onSearch} />
        </div>
      )}
    </header>
  );
};

