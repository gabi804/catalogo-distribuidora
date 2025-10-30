// src/components/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
  // onSearch es una función que el componente padre usa para recibir el texto
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Buscar por nombre o código SKU..."
        onChange={handleChange}
        // ... (otros estilos)
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#fff', // Fondo blanco para el input
          color: '#000',           // Texto negro dentro del input
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
    </div>
  );
};