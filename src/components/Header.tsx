import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(23, 25, 23, 0.9)', // tono oscuro con leve verde
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        padding: '16px 32px',
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
            fontSize: '1.6rem',
            color: '#00e676', // verde brillante
            fontWeight: 600,
            letterSpacing: '1px',
            margin: 0,
          }}
        >
          Distribuidora Kati
        </h1>
      </div>

      {/* Ícono o barra de búsqueda */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: '0 0 auto',
        }}
      >
        {/* 📱 En móviles: mostrar botón lupa */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          style={{
            background: 'none',
            border: 'none',
            color: '#00e676',
            fontSize: '1.6rem',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-search-btn"
        >
          🔍
        </button>

        {/* 💻 En escritorio o si showSearch = true */}
        <div
          style={{
            width: showSearch ? '100%' : '300px',
            transition: 'all 0.3s ease',
          }}
          className="search-bar-container"
        >
          {(showSearch || window.innerWidth > 768) && (
            <SearchBar onSearch={onSearch} />
          )}
        </div>
      </div>
    </header>
  );
};
