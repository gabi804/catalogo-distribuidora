import React, { useContext, useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { ThemeContext } from '../context/ThemeContext';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes moveGradient {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}`;
document.head.appendChild(style);

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        background:
          theme === 'dark'
            ? 'linear-gradient(90deg, #0f0f0f, #1b1b1b)'
            : 'linear-gradient(90deg, #f5f5f5, #ffffff)',
        boxShadow:
          theme === 'dark'
            ? '0 4px 15px rgba(0,0,0,0.5)'
            : '0 4px 10px rgba(0,0,0,0.1)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* 🔹 Logo + título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/catalogo-distribuidora/producto.img/logo.jpeg"
          alt="Logo"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow:
              theme === 'dark'
                ? '0 0 10px rgba(0,255,100,0.5)'
                : '0 0 10px rgba(0,200,150,0.4)',
          }}
        />
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '1px',
            margin: 0,
            background: 'linear-gradient(90deg, #00e676, #00bfa5, #00e676)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'moveGradient 6s linear infinite',
          }}
        >
          Distribuidora Kati
        </h1>
      </div>

      {/* 🔹 Buscador + Toggle */}
      {isMobile ? (
        <>
          {/* 🔸 CONTENEDOR DE ICONOS EN MÓVIL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {/* 🔍 Botón para abrir/cerrar el buscador */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              style={{
                background: 'none',
                border: 'none',
                color: theme === 'dark' ? '#00e676' : '#00796b',
                fontSize: '1.8rem',
                cursor: 'pointer',
              }}
            >
              🔍
            </button>

            {/* 🌗 BOTÓN DE CAMBIO DE TEMA TAMBIÉN EN MÓVIL 👇 */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                color: theme === 'dark' ? '#ffffff' : '#222',
                fontSize: '1.7rem',
                cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* 🔸 El buscador se muestra debajo cuando se presiona la lupa */}
          {showSearch && (
            <div
              style={{
                width: '100%',
                maxWidth: '80%',
                marginTop: '10px',
                marginInline: 'auto',
              }}
            >
              <SearchBar onSearch={onSearch} />
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '300px' }}>
            <SearchBar onSearch={onSearch} />
          </div>

          {/* 🌗 Toggle en escritorio */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.3rem 0.6rem',
              marginLeft: 'auto',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      )}
    </header>
  );
};
